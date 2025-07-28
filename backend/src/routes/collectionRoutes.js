const express = require("express");
const router = express.Router();
const {
  adicionarRelogioNaColecao,
  listarColecaoDoUsuario,
  atualizarValorEstimado,
  removerRelogioDaColecao,
} = require("../controllers/collectionController");

const authMiddleware = require("../middlewares/authMiddleware");

// Todas as rotas exigem usuário logado
router.use(authMiddleware);

/**
 * @swagger
 * /api/collections:
 *   post:
 *     summary: Adiciona um relógio à coleção do usuário logado
 *     tags: [Coleções]
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
 *         description: Relógio adicionado à coleção
 *       400:
 *         description: Erro ao adicionar relógio
 */
router.post("/", adicionarRelogioNaColecao); // Adicionar relógio à coleção

/**
 * @swagger
 * /api/collections:
 *   get:
 *     summary: Lista a coleção de relógios do usuário logado
 *     tags: [Coleções]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get("/", listarColecaoDoUsuario); // Listar coleção do usuário logado

/**
 * @swagger
 * /api/collections/{id}:
 *   put:
 *     summary: Atualiza o valor estimado de um relógio da coleção
 *     tags: [Coleções]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item da coleção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estimatedValue
 *             properties:
 *               estimatedValue:
 *                 type: number
 *     responses:
 *       200:
 *         description: Valor atualizado com sucesso
 */
router.put("/:id", atualizarValorEstimado); // Atualizar valor estimado de um relógio da coleção

/**
 * @swagger
 * /api/collections/{watchId}:
 *   delete:
 *     summary: Remove um relógio da coleção
 *     tags: [Coleções]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: watchId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do relógio a ser removido
 *     responses:
 *       200:
 *         description: Relógio removido da coleção
 */
router.delete("/:watchId", removerRelogioDaColecao); // Remover relógio da coleção

module.exports = router;
