const express = require("express");
const router = express.Router();

const {
  criarRelogio,
  listarRelogios,
  buscarRelogioPorId,
  atualizarRelogio,
  excluirRelogio,
} = require("../controllers/watchController");

const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");

// Públicas:

/**
 * @swagger
 * /api/watches:
 *   get:
 *     summary: Lista todos os relógios disponíveis
 *     tags: [Relógios]
 *     responses:
 *       200:
 *         description: Lista de relógios retornada com sucesso
 */
router.get("/", listarRelogios);

/**
 * @swagger
 * /api/watches/{id}:
 *   get:
 *     summary: Busca um relógio por ID
 *     tags: [Relógios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do relógio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relógio encontrado
 *       404:
 *         description: Relógio não encontrado
 */
router.get("/:id", buscarRelogioPorId);

// Privadas (exigem token):

/**
 * @swagger
 * /api/watches:
 *   post:
 *     summary: Cria um novo relógio
 *     tags: [Relógios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               condition:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Relógio criado com sucesso
 *       400:
 *         description: Erro na criação do relógio
 */
router.post("/", authMiddleware, upload.single("image"), criarRelogio);

/**
 * @swagger
 * /api/watches/{id}:
 *   put:
 *     summary: Atualiza os dados de um relógio
 *     tags: [Relógios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do relógio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Relógio atualizado com sucesso
 *       404:
 *         description: Relógio não encontrado
 */
router.put("/:id", authMiddleware, atualizarRelogio);

/**
 * @swagger
 * /api/watches/{id}:
 *   delete:
 *     summary: Remove um relógio
 *     tags: [Relógios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do relógio
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Relógio deletado com sucesso
 *       404:
 *         description: Relógio não encontrado
 */
router.delete("/:id", authMiddleware, excluirRelogio);

module.exports = router;
