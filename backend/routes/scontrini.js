const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//post con transazione- inserisce scontrino-set dettagli_ordinazione.status = "paid"-set ordinazione.stato="chiuso"
router.post("/", async (req, res) => {
  const { id_ordinazione, totale_pagato, id_utente_cassiere } = req.body;
    const totale = parseFloat(totale_pagato);
  const connection = await pool.getConnection();

  try {
    if (!id_ordinazione || !totale || totale <= 0) {
      connection.release();
      return res.status(400).json({ error: "Dati non validi" });
    }

    // Inizio transazione
    await connection.beginTransaction();

    // 1. Inserisce lo scontrino
    await connection.query(
      `INSERT INTO scontrini (id_ordinazione, totale_pagato, id_utente_cassiere) 
       VALUES (?, ?, ?)`,
      [id_ordinazione, totale, id_utente_cassiere || 1],
    );

    // 2. Aggiorna lo status dell'ordinazione a 'paid'
    await connection.query(
      `UPDATE dettagli_ordinazione SET status = 'paid' WHERE id_ordinazione = ?`,
      [id_ordinazione],
    );

    // 3. Aggiorna lo status dell'ordine a 'chiuso'
    await connection.query(
      `UPDATE ordinazioni SET stato = 'pagata' WHERE id_ordinazione = ?`,
      [id_ordinazione],
    );

    // Commit della transazione
    await connection.commit();

    res.status(201).json({
      message: `Scontrino inserito e ordinazione aggiornata con successo`,
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
