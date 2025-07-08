// backend/src/controllers/orderController.js
const prisma = require('../config/prisma');

// Criar novo pedido
const criarPedido = async (req, res) => {
  try {
    const { watchId } = req.body;
    const buyerId = req.user.id;

    const novoPedido = await prisma.order.create({
      data: {
        buyerId,
        watchId,
        status: 'pendente',
        paymentInfo: '',
        shippingInfo: ''
      }
    });

    res.status(201).json({
      message: 'Pedido criado com sucesso!',
      pedido: novoPedido
    });
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
};

// Listar todos os pedidos do usuário logado
const listarPedidosDoUsuario = async (req, res) => {
  try {
    const pedidos = await prisma.order.findMany({
      where: { buyerId: req.user.id },
      include: {
        watch: {
          select: {
            id: true,
            brand: true,
            model: true,
            price: true,
            images: true
          }
        }
      }
    });

    res.json(pedidos);
  } catch (err) {
    console.error('Erro ao listar pedidos:', err);
    res.status(500).json({ error: 'Erro ao listar pedidos.' });
  }
};

// Atualizar status do pedido (ex: pago, enviado, entregue)
const atualizarStatusPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedidoExistente = await prisma.order.findUnique({
      where: { id: parseInt(id) }
    });

    if (!pedidoExistente) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    const pedidoAtualizado = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json({
      message: 'Status do pedido atualizado com sucesso!',
      pedido: pedidoAtualizado
    });
  } catch (err) {
    console.error('Erro ao atualizar pedido:', err);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido.' });
  }
};

module.exports = {
  criarPedido,
  listarPedidosDoUsuario,
  atualizarStatusPedido
};