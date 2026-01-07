const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// criar gato
router.post("/", async (req, res) => {
  try {
    const { nome, idade, tutor_id } = req.body;

    const result = await pool.query(
      "INSERT INTO cats (nome, idade, tutor_id) VALUES ($1, $2, $3) RETURNING *",
      [nome, idade, tutor_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar gato" });
  }
});

// listar gatos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cats.*, tutors.nome AS tutor_nome
       FROM cats
       JOIN tutors ON tutors.id = cats.tutor_id`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar gatos" });
  }
});

module.exports = router;
