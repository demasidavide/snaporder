const express = require("express");
const db = require("./connDb.js")
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

//route per tavoli
const tavoliRouter = require('./routes/tavoli.js');
app.use('/tavoli',tavoliRouter);

app.listen(3000, () => console.log("server partito su porta 3000"));