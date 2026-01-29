const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET con join prodotti per tabella principale CIBO
router.get("/food", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT prodotti.nome as nome_prodotti, 
      dettagli_ordinazione.quantita as quantita,
      dettagli_ordinazione.id_dettaglio as id_dettaglio,
      dettagli_ordinazione.note as note 
      FROM dettagli_ordinazione INNER JOIN  prodotti
      ON prodotti.id_prodotto = dettagli_ordinazione.id_prodotto
      WHERE tipo_prodotto = "cibo"`);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//GET con join prodotti per tabella principale BEVANDE
router.get("/drink", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT prodotti.nome as nome_prodotti, 
      dettagli_ordinazione.quantita as quantita,
      dettagli_ordinazione.id_dettaglio as id_dettaglio,
      dettagli_ordinazione.note as note 
      FROM dettagli_ordinazione INNER JOIN  prodotti
      ON prodotti.id_prodotto = dettagli_ordinazione.id_prodotto
      WHERE tipo_prodotto = "bevanda"`);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//POST inserimento dettaglio
router.post("/", async (req, res) => {
  const {
    id_ordinazione,
    id_prodotto,
    quantita,
    prezzo_unitario,
    subtotale,
    note,
  } = req.body;
  try {
    if (!id_ordinazione || !id_prodotto || quantita === 0) {
      return res.status(400).json({ error: "Dati non validi" });
    }
    const result = await pool.query(
      `
            INSERT INTO dettagli_ordinazione (id_ordinazione, id_prodotto, quantita, prezzo_unitario, subtotale, note) 
            VALUES (?,?,?,?,?,?)`,
      [id_ordinazione, id_prodotto, quantita, prezzo_unitario, subtotale, note],
    );
    res.status(201).json({
      message: `Dettaglio inserito con successo`,
    });
  } catch (e) {
    res.status(500).json({ error: "Errore nel Database" });
  }
});
//DELETE pewr cancellazione con id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ error: `ID ${id} non trovato o non valido` });
    }
    const result = await pool.query(
      `
            DELETE FROM dettagli_ordinazione WHERE id_dettaglio = ?`,
      [id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Id non trovato" });
    }
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//PUT per modifica dettagli con id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { note, quantita } = req.body;
  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Id non trovato o non valido" });
    }
    if (quantita === undefined || quantita === null || quantita <= 0) {
      return res.status(400).json({ error: "Quantità non valida" });
    }

    // Recupero il prezzo unitario dal database
    const [rows] = await pool.query(
      `SELECT prezzo_unitario FROM dettagli_ordinazione WHERE id_dettaglio = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }

    // Calcolo il subtotale
    const prezzo_unitario = rows[0].prezzo_unitario;
    const subtotale = quantita * prezzo_unitario;

    const [result] = await pool.query(
      `UPDATE dettagli_ordinazione
SET note = ?, quantita = ?, subtotale = ?
WHERE id_dettaglio = ?`,
      [note, quantita, subtotale, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }
    res.status(200).json({ message: "Prodotto aggiornato con successo" });
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});

module.exports = router;
