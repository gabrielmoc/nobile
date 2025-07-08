// backend/src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();

const {
  criarPedido,
  listarPedidosDoUsuario,
  atualizarStatusPedido
} = require('../controllers/orderController');

const authMiddleware = require('../middlewares/authMiddleware');
const stripeController = require('../controllers/stripeController');

// Todas as rotas de pedido exigem autenticação
router.use(authMiddleware);

// Criar pedido
router.post('/', criarPedido);

// Listar todos os pedidos do usuário logado
router.get('/', listarPedidosDoUsuario);

// Atualizar status do pedido
router.put('/:id', atualizarStatusPedido);

// Criar sessão de pagamento Stripe
router.post('/checkout/:orderId', stripeController.criarCheckout);

module.exports = router;