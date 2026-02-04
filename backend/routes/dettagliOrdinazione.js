const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET per ordini in ritardo( recupero solo i campi necessari )
router.get ("/delay",async (req,res)=>{
try{
  const [rows] = await pool.query(`
    SELECT id_dettaglio,id_ordinazione,ordinato_il 
    FROM dettagli_ordinazione; 
    `)
    res.status(200).json(rows);
}catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});

//GET con join prodotti per tabella principale CIBO
router.get("/food/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT prodotti.nome as nome_prodotti, 
      dettagli_ordinazione.quantita as quantita,
      dettagli_ordinazione.id_dettaglio as id_dettaglio,
      dettagli_ordinazione.note as note 
      FROM dettagli_ordinazione INNER JOIN  prodotti
      ON prodotti.id_prodotto = dettagli_ordinazione.id_prodotto
      WHERE tipo_prodotto = "cibo"
      and id_ordinazione = ?
      and dettagli_ordinazione.status = "pending"`,
      [id]
    );
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//GET con join prodotti per tabella principale BEVANDE
router.get("/drink/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT prodotti.nome as nome_prodotti, 
      dettagli_ordinazione.quantita as quantita,
      dettagli_ordinazione.id_dettaglio as id_dettaglio,
      dettagli_ordinazione.note as note 
      FROM dettagli_ordinazione INNER JOIN  prodotti
      ON prodotti.id_prodotto = dettagli_ordinazione.id_prodotto
      WHERE tipo_prodotto = "bevanda"
      and id_ordinazione = ?
      and dettagli_ordinazione.status = "pending"`,
      [id]
    );
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//get con join prodotti e ordinazioni per tabella pay in pay.jsx
router.get("/pay/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT prodotti.nome as nome_prodotti, 
      dettagli_ordinazione.quantita as quantita,
      dettagli_ordinazione.id_dettaglio as id_dettaglio,
      dettagli_ordinazione.prezzo_unitario as prezzo_unitario, 
      dettagli_ordinazione.subtotale as subtotale,
      ordinazioni.numero_persone as numero_persone,
      ordinazioni.posizione as posizione,
      ordinazioni.nome_ordine as nome_ordine
      FROM dettagli_ordinazione 
      INNER JOIN prodotti ON prodotti.id_prodotto = dettagli_ordinazione.id_prodotto
      INNER JOIN ordinazioni ON ordinazioni.id_ordinazione = dettagli_ordinazione.id_ordinazione
      WHERE dettagli_ordinazione.status = "pending"
      AND dettagli_ordinazione.id_ordinazione = ?`,
      [id],
    );
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//POST con transazione per inserimento prodotto personalizzato-
//1.creazione prodotto-2.inserimento dettaglio
router.post("/crea", async (req, res) => {
const {nome, prezzo_unitario, tipo_prodotto,quantita,note, id_ordinazione, subtotale } = req.body;
const connection = await pool.getConnection();
try{
  if(!nome || prezzo_unitario <= 0 || !tipo_prodotto || quantita <= 0){
    connection.release();
    return res.status(400).json({ error: "Dati non validi" });
  }

// Inizio transazione
    await connection.beginTransaction();
    // 1. Inserisce il prodotto e ottiene l'ID generato
    const [result] = await connection.query(
      `INSERT INTO prodotti (nome, prezzo_unitario, tipo_prodotto) 
       VALUES (?, ?, ?)`,
      [nome, prezzo_unitario, tipo_prodotto]
    );
    const prodottoId = result.insertId; 

    // 2. Aggiungi prodotto a dettagli ordinazione
    await connection.query(
      `INSERT INTO dettagli_ordinazione (id_ordinazione, id_prodotto, quantita, prezzo_unitario, note, subtotale) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_ordinazione, prodottoId, quantita, prezzo_unitario, note, subtotale]
    );
// Commit della transazione
    await connection.commit();
res.status(201).json({
      message: `Scontrino inserito e ordinazione aggiornata con successo`,
      });
}catch (e) {
    // Rollback in caso di errore
    await connection.rollback();
    console.error("Errore transazione:", e);
    res.status(500).json({ error: "Errore nel Database" });
  } finally {
    connection.release();
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
