const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// criar tutor
router.post("/", async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    const result = await pool.query(
      "INSERT INTO tutors (nome, telefone) VALUES ($1, $2) RETURNING *",
      [nome, telefone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar tutor" });
  }
});

// listar tutores
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tutors");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar tutores" });
  }
});

module.exports = router;
