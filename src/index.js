const express = require("express");
const cors = require('cors'); // Importante para o seu HTML funcionar
const app = express();

// IMPORTANTE: Aqui é apenas UM PONTO (.), pois o index.js está ao lado da pasta db
const pool = require("./db/connection"); 

const tutorRoutes = require("./routes/tutor.routes");
const catRoutes = require("./routes/cat.routes");
const appointmentRoutes = require("./routes/appointment.routes");

app.use(cors()); // Libera o acesso para o seu index.html
app.use(express.json());
//servir arquivos estáticos do diretório 'docker' (index.html, etc.)
app.use(express.static('docker'));

//servir a página inicial na rota raiz
app.get('/', (req, res) => {
  try {
    res.sendFile(require('path').join(__dirname, 'docker', 'index.html'));
  } catch (err) {
    res.status(200).send("CatCare API Online");
  }
});

app.use("/tutors", tutorRoutes);
app.use("/cats", catRoutes);
app.use("/appointments", appointmentRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log("🐱 CatCare API rodando na porta 3000");
  });
}

module.exports = app;
