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
const { realizarPayout } = require("../controllers/orderController");

router.use(authMiddleware); // Todas as rotas abaixo exigem autenticação

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - watchId
 *             properties:
 *               watchId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post("/", criarPedido); // Criar pedido

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista todos os pedidos do usuário logado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
router.get("/", listarPedidosDoUsuario); // Listar todos os pedidos do usuário logado

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Atualiza manualmente o status de um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Enviado"
 *     responses:
 *       200:
 *         description: Status do pedido atualizado
 */
router.put("/:id", atualizarStatusPedido); // Atualizar status do pedido manualmente

/**
 * @swagger
 * /api/orders/checkout/{orderId}:
 *   post:
 *     summary: Cria uma sessão de pagamento no Stripe
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: URL da sessão de pagamento retornada com sucesso
 */
router.post("/checkout/:orderId", stripeController.criarCheckout); // Criar sessão de pagamento Stripe

/**
 * @swagger
 * /api/orders/verificar-pagamento:
 *   get:
 *     summary: Verifica se o pagamento foi concluído com sucesso
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sessionId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pagamento confirmado
 *       400:
 *         description: Pagamento ainda não concluído
 */
router.get("/verificar-pagamento", stripeController.verificarPagamento); // Verificar status do pagamento usando sessionId

/**
 * @swagger
 * /api/orders/{id}/confirm-delivery:
 *   put:
 *     summary: Confirma a entrega de um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrega confirmada com sucesso
 */
router.put("/:id/confirm-delivery", confirmarEntrega); //Confirmar entrega

/**
 * @swagger
 * /api/orders/payout/{orderId}:
 *   post:
 *     summary: Realiza o payout para o vendedor
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payout realizado e transação registrada
 *       400:
 *         description: Pedido ainda não pago
 */
router.post("/payout/:orderId", realizarPayout); // Payout

module.exports = router;
