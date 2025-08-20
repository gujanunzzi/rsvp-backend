const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Lista de convidados
const convidados = [
  { nome: "Ana Silva", confirmado: false },
  { nome: "Bernardo Fagundes", confirmado: false },
  { nome: "Bárbara Aleixa", confirmado: false },
  { nome: "Bankai Katenkyoko", confirmado: false },
  { nome: "Bruno Costa", confirmado: false },
  { nome: "Carlos Souza", confirmado: false },
  { nome: "Daniela Rocha", confirmado: false },
  { nome: "Eduardo Lima", confirmado: false },
  // ...coloque até 100 nomes aqui
];

// Servir o index.html
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter a lista
app.get('https://rsvp-backend-1ry5.onrender.com/convidados', (req, res) => {
  res.json(convidados);
});

// Rota para confirmar presença
app.post('https://rsvp-backend-1ry5.onrender.com/confirmar-presenca', (req, res) => {
  const nome = req.body.nome;
  const convidado = convidados.find(c => c.nome.toLowerCase() === nome.toLowerCase());
  if (!convidado) {
    return res.status(404).json({ error: 'Convidado não encontrado.' });
  }
  if (convidado.confirmado) {
    return res.status(400).json({ error: 'Presença já confirmada.' });
  }
  convidado.confirmado = true;
  res.json({ message: 'Presença confirmada com sucesso.' });
});

// Rodar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
