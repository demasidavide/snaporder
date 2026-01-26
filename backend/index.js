const express = require("express");
const db = require("./connDb.js")
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

//route per tavoli----------NON PIU IN USO-----------
// const tavoliRouter = require('./routes/tavoli.js');
// app.use('/tavoli',tavoliRouter);
//route per ordinazioni
const ordinazioniRouter = require('./routes/ordinazioni.js');
app.use('/ordinazioni',ordinazioniRouter);
//route per prodotti
const prodottiRouter = require('./routes/prodotti.js');
app.use('/prodotti',prodottiRouter);

app.listen(3000, () => console.log("server partito su porta 3000"));