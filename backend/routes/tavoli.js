

//------------------------------ATTENZIONE--TABELLA NON PIU IN USO---------------------------------------------------

const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET per leggere numero dei tavoli
router.get("/tot", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM tavoli");
    res.status(200).json({ total: rows[0].total });
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});

//GET per leggere tutti i tavoli
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tavoli");
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//POST per inserimento nuovo tavolo
router.post("/", async (req, res) => {
  const { nome, numPosti } = req.body;
  try {
    if (!nome || numPosti <= 0) {
      return res
        .status(400)
        .json({ error: "Nome non valido o numero posti minore o uguale a 0" });
    }

    const result = await pool.query(
      `
            INSERT INTO tavoli (nome_tavolo,numero_posti) 
            VALUES (?,?)`,
      [nome, numPosti],
    );
    res.status(201).json({
      message: `Tavolo a nome ${nome} da ${numPosti} posti inserito con successo`,
    });
  } catch (e) {
    res.status(500).json({ error: "Errore nel Database" });
  }
});

//DELETE per cancellazione tavolo
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
            DELETE FROM tavoli WHERE id_tavolo = ?`,
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

module.exports = router;
