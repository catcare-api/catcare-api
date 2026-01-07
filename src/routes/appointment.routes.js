const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// criar atendimento
router.post("/", async (req, res) => {
  try {
    const { tipo, data, gato_id } = req.body;

    const result = await pool.query(
      "INSERT INTO appointments (tipo, data, gato_id) VALUES ($1, $2, $3) RETURNING *",
      [tipo, data, gato_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar atendimento" });
  }
});

// listar atendimentos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT appointments.*, cats.nome AS gato_nome
       FROM appointments
       JOIN cats ON cats.id = appointments.gato_id`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar atendimentos" });
  }
});

module.exports = router;
