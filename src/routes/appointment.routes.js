const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Criar agendamento (O NOVO COM VALIDAÇÃO DE DATA)
router.post("/", async (req, res) => {
  try {
    const { cat_id, data_consulta, descricao } = req.body;

    if (!cat_id || !data_consulta) {
      return res.status(400).json({ error: "cat_id e data_consulta são obrigatórios" });
    }

    // --- AQUI ESTÁ A MUDANÇA: VALIDAÇÃO ---
    const dataAgendamento = new Date(data_consulta);
    const agora = new Date();

    if (dataAgendamento < agora) {
      return res.status(400).json({ 
        error: "Não é possível agendar uma consulta para uma data que já passou." 
      });
    }
    // ---------------------------------------

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

// Buscar agendamentos pelo nome do gato (Busca Inteligente)
// Localize sua rota GET e substitua a query por esta:
router.get("/", async (req, res) => {
    try {
        const query = `
            SELECT 
                a.id, 
                c.nome AS nome_gato, 
                t.nome AS nome_tutor, 
                a.data_consulta, 
                a.descricao, 
                a.status
            FROM appointments a
            JOIN cats c ON a.cat_id = c.id
            JOIN tutors t ON c.tutor_id = t.id
            ORDER BY a.data_consulta DESC
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