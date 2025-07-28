const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @swagger
 * /api/admin/reports:
 *   get:
 *     summary: Gera relatórios administrativos do sistema
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Relatórios gerados com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado (não é admin)
 */

// Todas as rotas de admin exigem autenticação + permissão ADMIN
router.use(authMiddleware);
router.use(isAdmin);

// GET /api/admin/reports
router.get("/reports", adminController.gerarRelatorios);

module.exports = router;
