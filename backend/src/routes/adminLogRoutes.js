const express = require("express");
const router = express.Router();
const { listarLogs } = require("../controllers/adminLogController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @swagger
 * /api/admin/logs:
 *   get:
 *     summary: Lista os logs administrativos do sistema
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs retornada com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Acesso negado (não é admin)
 */
router.get("/logs", authMiddleware, isAdmin, listarLogs);

module.exports = router;
