const express = require("express");
const db = require("./connDb.js")
const app = express();
app.use(express.json());

//route per tavoli
const tavoliRouter = require('./routes/tavoli.js');
app.use('/tavoli',tavoliRouter);

app.listen(3000, () => console.log("server partito su porta 3000"));