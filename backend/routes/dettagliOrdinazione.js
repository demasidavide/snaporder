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
//POST inserimento dettaglio
router.post('/', async (req, res) => {
  const { id_ordinazione, id_prodotto, quantita, prezzo_unitario, subtotale } = req.body;
try{
  if(!id_ordinazione || !id_prodotto || quantita === 0){
    return res
        .status(400)
        .json({ error: "Dati non validi" });
  }
  const result = await pool.query(
      `
            INSERT INTO dettagli_ordinazione (id_ordinazione, id_prodotto, quantita, prezzo_unitario, subtotale) 
            VALUES (?,?,?,?,?)`,
      [ id_ordinazione, id_prodotto, quantita, prezzo_unitario, subtotale ],
    );
    res.status(201).json({
      message: `Dettaglio inserito con successo`,
    });
  } catch (e) {
    res.status(500).json({ error: "Errore nel Database" });
  }
})



module.exports = router;