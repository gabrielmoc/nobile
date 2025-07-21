const express = require("express");
const router = express.Router();

const {
  criarPedido,
  listarPedidosDoUsuario,
  atualizarStatusPedido,
} = require("../controllers/orderController");

const stripeController = require("../controllers/stripeController");
const authMiddleware = require("../middlewares/authMiddleware");
const { confirmarEntrega } = require("../controllers/orderController");

// ✅ Todas as rotas abaixo exigem autenticação
router.use(authMiddleware);

// Criar pedido
router.post("/", criarPedido);

// Listar todos os pedidos do usuário logado
router.get("/", listarPedidosDoUsuario);

// Atualizar status do pedido manualmente
router.put("/:id", atualizarStatusPedido);

// Criar sessão de pagamento Stripe
router.post("/checkout/:orderId", stripeController.criarCheckout);

// Verificar status do pagamento usando sessionId
router.get("/verificar-pagamento", stripeController.verificarPagamento);

router.put("/:id/confirm-delivery", confirmarEntrega);

module.exports = router;
