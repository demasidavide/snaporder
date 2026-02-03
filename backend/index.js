const express = require("express");
const db = require("./connDb.js")
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const ordinazioniRouter = require('./routes/ordinazioni.js');
const prodottiRouter = require('./routes/prodotti.js');
const dettagliRouter = require('./routes/dettagliOrdinazione.js');
const scontriniRouter = require('./routes/scontrini.js');
const authRouter = require('./routes/auth.js');
const adminRouter = require('./routes/admin.js');
const mailRoutes = require('./routes/mail.js');
app.use('/ordinazioni',ordinazioniRouter);
app.use('/prodotti',prodottiRouter);
app.use('/dettagli',dettagliRouter);
app.use('/scontrini',scontriniRouter);
app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/mail', mailRoutes);

app.listen(3000, () => console.log("server partito su porta 3000"));