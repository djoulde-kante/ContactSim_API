
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { Pool } = require('pg');
// const jwt = require('jsonwebtoken');
// Importation du module express
const express = require("express");

const app = express();


app.use(express.json());

const contactsRoutes = require("./routes/contacts");


app.use("/contacts", contactsRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur de contacts démarré sur http://localhost:${PORT}`);
});

