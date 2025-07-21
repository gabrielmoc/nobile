// backend/src/controllers/orderController.js
const prisma = require("../config/prisma");

// Criar novo pedido
const criarPedido = async (req, res) => {
  try {
    const { watchId } = req.body;
    const buyerId = req.user.id;

    const novoPedido = await prisma.order.create({
      data: {
        buyerId,
        watchId,
        status: "pendente",
        paymentInfo: "",
        shippingInfo: "",
      },
    });

    res.status(201).json({
      message: "Pedido criado com sucesso!",
      pedido: novoPedido,
    });
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    res.status(500).json({ error: "Erro ao criar pedido." });
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
            images: true,
          },
        },
      },
    });

    res.json(pedidos);
  } catch (err) {
    console.error("Erro ao listar pedidos:", err);
    res.status(500).json({ error: "Erro ao listar pedidos." });
  }
};

// Atualizar status do pedido (ex: pago, enviado, entregue)
const atualizarStatusPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedidoExistente = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    const pedidoAtualizado = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json({
      message: "Status do pedido atualizado com sucesso!",
      pedido: pedidoAtualizado,
    });
  } catch (err) {
    console.error("Erro ao atualizar pedido:", err);
    res.status(500).json({ error: "Erro ao atualizar status do pedido." });
  }
};

const confirmarEntrega = async (req, res) => {
  const orderId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    const pedido = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    if (pedido.buyerId !== userId) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    if (pedido.status !== "Pago") {
      return res.status(400).json({ error: "Pedido ainda não foi pago." });
    }

    const atualizado = await prisma.order.update({
      where: { id: orderId },
      data: { status: "Entregue" },
    });

    return res.json({
      success: true,
      message: "Entrega confirmada com sucesso.",
      pedido: atualizado,
    });
  } catch (err) {
    console.error("Erro ao confirmar entrega:", err.message);
    return res.status(500).json({ error: "Erro ao confirmar entrega." });
  }
};

const realizarPayout = async (req, res) => {
  const { orderId } = req.params;

  try {
    const pedido = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        watch: {
          include: {
            seller: true,
          },
        },
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    if (pedido.status !== "Pago") {
      return res.status(400).json({ error: "Pedido ainda não foi pago." });
    }

    const valorPago = pedido.watch.price;
    const taxaMarketplace = 0.1 * valorPago;
    const valorRecebido = valorPago - taxaMarketplace;

    await prisma.transaction.create({
      data: {
        orderId: pedido.id,
        sellerId: pedido.watch.seller.id,
        amount: Math.round(valorRecebido * 100), // Em centavos
        type: "PAYOUT",
      },
    });

    return res.json({
      success: true,
      message: "Payout realizado com sucesso.",
      dados: {
        vendedor: pedido.watch.seller.name,
        valor_pago: valorPago,
        comissao: taxaMarketplace,
        valor_recebido: valorRecebido,
      },
    });
  } catch (err) {
    console.error("Erro no payout:", err.message);
    return res.status(500).json({ error: "Erro ao realizar o payout." });
  }
};

module.exports = {
  criarPedido,
  listarPedidosDoUsuario,
  atualizarStatusPedido,
  confirmarEntrega,
  realizarPayout,
};
