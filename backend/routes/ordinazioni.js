const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET per leggere numero dei tavoli/ordinazioni
router.get("/tot", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM ordinazioni WHERE stato = 'aperta'",
    );
    res.status(200).json({ total: rows[0].total });
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//GET per prendere tutte le ordinazioni
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM ordinazioni WHERE stato = 'aperta'",
    );
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//POST per inserimento nuova ordinazione
router.post("/", async (req, res) => {
  const { id_utente, numero_persone, stato, nome_ordine, posizione } = req.body;
  try {
    if (!id_utente || numero_persone <= 0 || !nome_ordine) {
      return res
        .status(400)
        .json({ error: "Nome non valido o numero posti minore o uguale a 0" });
    }

    const result = await pool.query(
      `
            INSERT INTO ordinazioni (nome_ordine,numero_persone,id_utente,stato, posizione) 
            VALUES (?,?,?,?,?)`,
      [nome_ordine, numero_persone, id_utente, stato, posizione],
    );
    res.status(201).json({
      message: `Tavolo a nome ${nome_ordine} da ${numero_persone} posti inserito con successo`,
    });
  } catch (e) {
    res.status(500).json({ error: "Errore nel Database" });
  }
});
//DELETE con transazione per cancellare dettagli ordinazione e ordinazione
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Deve corrispondere a ":id" nell'URL
  const connection = await pool.getConnection();

  try {
    if (!id) {
      connection.release();
      return res.status(400).json({ error: "Id non valido" });
    }

    // Inizio transazione
    await connection.beginTransaction();

    // 1. Elimina i dettagli dell'ordinazione
    await connection.query(
      `DELETE from dettagli_ordinazione 
      WHERE id_ordinazione = ? `,
      [id],
    );

    // 2. Elimina l'ordinazione
    await connection.query(
      `DELETE from ordinazioni 
      WHERE id_ordinazione = ?`,
      [id],
    );

    // Commit della transazione
    await connection.commit();

    res.status(200).json({
      message: `Ordinazione e dettagli eliminati con successo`,
    });
  } catch (e) {
    // Rollback in caso di errore
    await connection.rollback();
    console.error("Errore transazione:", e);
    res.status(500).json({ error: "Errore nel Database" });
  } finally {
    connection.release();
  }
});

module.exports = router;
