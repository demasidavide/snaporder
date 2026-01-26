const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET tutti i prodotti-----------------------------------------
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM prodotti");
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//-------------------------------------------------------------
//GET tutti i cibi-----------------------------------------
router.get("/cibi", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM prodotti WHERE tipo_prodotto = 'cibo'");
    if(rows.affectedRows = 0){
        return res.status(404).json({error:`Nessun elemento trovato`})
    }
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//-------------------------------------------------------------
//GET tutte le bevande-----------------------------------------
router.get("/bevande", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM prodotti WHERE tipo_prodotto = 'bevanda'");
    if(rows.affectedRows = 0){
        return res.status(404).json({error:`Nessun elemento trovato`})
    }
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ error: "Errore nel database" });
  }
});
//-------------------------------------------------------------
module.exports = router;