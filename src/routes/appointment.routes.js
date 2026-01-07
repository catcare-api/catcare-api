const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Criar agendamento
router.post("/", async (req, res) => {
  try {
    // Pegando os nomes corretos do corpo da requisição (Insomnia)
    const { cat_id, data_consulta, descricao } = req.body;

    // Verificação básica
    if (!cat_id || !data_consulta) {
      return res.status(400).json({ error: "cat_id e data_consulta são obrigatórios" });
    }

    const result = await pool.query(
      `INSERT INTO appointments (cat_id, data_consulta, descricao)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [cat_id, data_consulta, descricao]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ERRO NO BANCO:", error.message);
    res.status(500).json({ 
      error: "Erro ao criar agendamento", 
      details: error.message 
    });
  }
});

// Listar agendamentos com nomes dos gatos
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        a.id, a.data_consulta, a.descricao, a.status,
        c.nome AS nome_gato
      FROM appointments a
      INNER JOIN cats c ON a.cat_id = c.id
      ORDER BY a.data_consulta ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Atualizar agendamento
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data_consulta, descricao, status } = req.body;

    const result = await pool.query(
      `UPDATE appointments 
       SET data_consulta = $1, descricao = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [data_consulta, descricao, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar agendamento
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Pegamos apenas o ID da URL

    const result = await pool.query(
      "DELETE FROM appointments WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json({ message: "Agendamento removido com sucesso!" });
  } catch (error) {
    console.error("ERRO AO DELETAR:", error.message);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;