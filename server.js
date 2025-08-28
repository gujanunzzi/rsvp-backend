const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: 'https://casamento-rafa-e-gu.netlify.app'
}));


// Conexão com o banco da Neon (use variável de ambiente)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário para Neon
  },
});

// Rota para obter lista de convidados
app.get('/convidados', async (req, res) => {
  try {
    const result = await pool.query('SELECT nome, confirmado FROM convidados ORDER BY nome');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
});

// Rota para confirmar presença
app.post('/confirmar-presenca', async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  try {
    const select = await pool.query('SELECT * FROM convidados WHERE LOWER(nome) = LOWER($1)', [nome]);
    const convidado = select.rows[0];

    if (!convidado) {
      return res.status(404).json({ error: 'Convidado não encontrado.' });
    }

    if (convidado.confirmado) {
      return res.status(400).json({ error: 'Presença já confirmada.' });
    }

    await pool.query('UPDATE convidados SET confirmado = TRUE WHERE id = $1', [convidado.id]);

    res.json({ message: 'Presença confirmada com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao confirmar presença.' });
  }
});

app.post('/cancelar-presenca', async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório.' });
  }

  try {
    // Verifica se o convidado existe
    const result = await pool.query(
      'SELECT * FROM convidados WHERE LOWER(nome) = LOWER($1)',
      [nome]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Convidado não encontrado.' });
    }

    const convidado = result.rows[0];

    if (!convidado.confirmado) {
      return res.status(400).json({ error: 'Este convidado já não está confirmado.' });
    }

    // Atualiza o status de confirmação
    await pool.query(
      'UPDATE convidados SET confirmado = FALSE WHERE id = $1',
      [convidado.id]
    );

    res.json({ message: 'Presença cancelada com sucesso.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cancelar presença.' });
  }
});


// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
