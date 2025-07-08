const prisma = require('../config/prisma');

const adicionarRelogioNaColecao = async (req, res) => {
  try {
    const { watchId, estimatedValue } = req.body;
    const userId = req.user.id;

    const novaEntrada = await prisma.collection.create({
      data: {
        userId,
        watchId: parseInt(watchId),
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null
      },
      include: {
        watch: true
      }
    });

    res.status(201).json({
      message: 'Relógio adicionado à coleção com sucesso.',
      colecao: novaEntrada
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar relógio na coleção.' });
  }
};

const listarColecaoDoUsuario = async (req, res) => {
  try {
    const userId = req.user.id;

    const colecao = await prisma.collection.findMany({
      where: { userId },
      include: {
        watch: true
      }
    });

    res.json(colecao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar coleção.' });
  }
};

const atualizarValorEstimado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estimatedValue } = req.body;
    const userId = req.user.id;

    const colecao = await prisma.collection.findUnique({
      where: { id: parseInt(id) }
    });

    if (!colecao || colecao.userId !== userId) {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }

    const atualizado = await prisma.collection.update({
      where: { id: parseInt(id) },
      data: {
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null
      }
    });

    res.json({
      message: 'Valor estimado atualizado com sucesso.',
      colecao: atualizado
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar valor estimado.' });
  }
};

const removerRelogioDaColecao = async (req, res) => {
  try {
    const userId = req.user.id;
    const watchId = parseInt(req.params.watchId);

    // Verifica se o relógio realmente pertence à coleção do usuário
    const item = await prisma.collection.findFirst({
      where: {
        userId,
        watchId
      }
    });

    if (!item) {
      return res.status(404).json({ error: 'Relógio não encontrado na sua coleção.' });
    }

    await prisma.collection.delete({
      where: { id: item.id }
    });

    res.json({ message: 'Relógio removido da coleção com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover relógio da coleção.' });
  }
};

module.exports = {
  adicionarRelogioNaColecao,
  listarColecaoDoUsuario,
  atualizarValorEstimado,
  removerRelogioDaColecao
};