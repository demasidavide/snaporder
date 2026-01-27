const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET con join prodotti per tabella principale
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT prodotti.nome as nome_prodotti, 
      dettagli_ordinazione.quantita as quantita 
      FROM dettagli_ordinazione INNER JOIN  prodotti
      ON prodotti.id_prodotto = dettagli_ordinazione.id_prodotto`);
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});



module.exports = router;