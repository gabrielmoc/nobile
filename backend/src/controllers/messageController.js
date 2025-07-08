const prisma = require('../config/prisma');

const enviarMensagem = async (req, res) => {
  try {
    const { toUserId, content, watchId } = req.body;
    const fromUserId = req.user.id;

    const mensagem = await prisma.message.create({
      data: {
        fromUserId,
        toUserId: parseInt(toUserId),
        content,
        watchId: watchId ? parseInt(watchId) : null
      }
    });

    res.status(201).json(mensagem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao enviar mensagem.' });
  }
};

const listarMensagens = async (req, res) => {
  try {
    const userId = req.user.id;

    const mensagens = await prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: userId },
          { toUserId: userId }
        ]
      },
      include: {
        fromUser: { select: { id: true, name: true, email: true } },
        toUser: { select: { id: true, name: true, email: true } },
        watch: true
      },
      orderBy: { timestamp: 'desc' }
    });

    res.json(mensagens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
};

module.exports = {
  enviarMensagem,
  listarMensagens
};