const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const prisma = require('./config/prisma'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rota raiz
app.get('/', (req, res) => {
  res.send('API Nobile está no ar 🚀');
});

// teste da conexão com o banco
app.get('/teste-bd', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); 
    res.json({
      status: 'Conectado com sucesso!',
      quantidadeUsuarios: users.length,
      dados: users,
    });
  } catch (err) {
    console.error('Erro ao conectar com o banco:', err);
    res.status(500).json({ erro: 'Falha ao conectar com o banco de dados.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});