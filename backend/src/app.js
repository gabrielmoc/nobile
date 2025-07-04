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
    const watches = await prisma.watch.findMany();
    const orders = await prisma.order.findMany();
    const messages = await prisma.message.findMany();
    const collections = await prisma.collection.findMany();

    res.json({
      status: 'Banco acessado com sucesso!',
      users: users.length,
      watches: watches.length,
      orders: orders.length,
      messages: messages.length,
      collections: collections.length,
    });
  } catch (err) {
    console.error('Erro ao acessar tabelas:', err);
    res.status(500).json({ erro: 'Falha ao consultar tabelas', detalhes: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});