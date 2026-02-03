const express = require("express");
const pool = require("../connDb");
const router = express.Router();

//GET per lettura utenti e verifica se mail o 
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

module.exports = router;