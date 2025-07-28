const express = require("express");
const router = express.Router();

const {
  enviarMensagem,
  listarMensagens,
} = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Envia uma nova mensagem entre usuários
 *     tags: [Mensagens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toUserId
 *               - content
 *             properties:
 *               toUserId:
 *                 type: integer
 *               content:
 *                 type: string
 *               watchId:
 *                 type: integer
 *                 description: Opcional — ID do relógio vinculado à conversa
 *     responses:
 *       201:
 *         description: Mensagem enviada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", enviarMensagem);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Lista todas as mensagens do usuário logado
 *     tags: [Mensagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mensagens retornada com sucesso
 */
router.get("/", listarMensagens);

module.exports = router;
