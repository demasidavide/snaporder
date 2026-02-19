const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//Get per tutti i prodotti del menu - filtrata nei componenti per dividere con campo enum
router.get("/", async (req, res) => {
  try {
    const [rows] =
      await pool.query(`SELECT prodotti.nome, prodotti.prezzo_unitario, menu_giorno.categoria, 
                        menu_giorno.id_prodotto
                        FROM prodotti INNER JOIN menu_giorno
                        ON prodotti.id_prodotto = menu_giorno.id_prodotto;`);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ error: `ID ${id} non trovato o non valido` });
    }
    const [result] = await pool.query(
      `
            DELETE FROM menu_giorno WHERE id_prodotto = ?`,
      [id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Id non trovato" });
    }
    res.status(204).send();
  } catch (e) {
    console.error("Errore cancellazione:", e);
    res.status(500).json({ error: "Errore nel database" });
  }
});

//POST
router.post("/", async (req, res) => {
  const { id_prodotto, categoria, note } = req.body;
  try {
    if (!id_prodotto || !categoria || !note) {
      return res.status(400).json({ error: "Dati non validi" });
    }

    const [result] = await pool.query(
      `
            INSERT INTO menu_giorno (id_prodotto, categoria, note, data) 
            VALUES (?,?,?,?)`,
      [id_prodotto, categoria, note, new Date()],
    );
    res.status(201).json({
      message: `Prodotto con ID: ${id_prodotto} inserito con successo`,
    });
  } catch (e) {
    res.status(500).json({ error: "Errore nel Database" });
  }
});

module.exports = router;
