const prisma = require('../config/prisma');

const criarRelogio = async (req, res) => {
  try {
    const { brand, model, price, condition, description, images } = req.body;

    const novoRelogio = await prisma.watch.create({
      data: {
        brand,
        model,
        price: parseFloat(price),
        condition,
        description,
        images,
        sellerId: req.user.id
      },
    });

    res.status(201).json({
      message: 'Relógio cadastrado com sucesso!',
      relogio: novoRelogio
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar relógio.' });
  }
};

const listarRelogios = async (req, res) => {
  try {
    const relogios = await prisma.watch.findMany({
      include: {
        seller: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(relogios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar relógios.' });
  }
};

const buscarRelogioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const relogio = await prisma.watch.findUnique({
      where: { id: parseInt(id) },
      include: {
        seller: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!relogio) {
      return res.status(404).json({ error: 'Relógio não encontrado.' });
    }

    res.json(relogio);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar relógio.' });
  }
};

const atualizarRelogio = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, price, condition, description, images } = req.body;

    const relogioExistente = await prisma.watch.findUnique({
      where: { id: parseInt(id) }
    });

    if (!relogioExistente) {
      return res.status(404).json({ error: 'Relógio não encontrado.' });
    }

    // (Opcional) Verifica se o user atual é o dono do relógio

    const relogioAtualizado = await prisma.watch.update({
      where: { id: parseInt(id) },
      data: {
        brand,
        model,
        price: parseFloat(price),
        condition,
        description,
        images
      }
    });

    res.json({
      message: 'Relógio atualizado com sucesso!',
      relogio: relogioAtualizado
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar relógio.' });
  }
};

const excluirRelogio = async (req, res) => {
  try {
    const { id } = req.params;

    const relogio = await prisma.watch.findUnique({
      where: { id: parseInt(id) }
    });

    if (!relogio) {
      return res.status(404).json({ error: 'Relógio não encontrado.' });
    }

    await prisma.watch.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Relógio excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir relógio.' });
  }
};

module.exports = {
  criarRelogio,
  listarRelogios,
  buscarRelogioPorId,
  atualizarRelogio,
  excluirRelogio
};