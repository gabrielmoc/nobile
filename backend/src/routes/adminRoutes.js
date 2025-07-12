const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// Todas as rotas de admin exigem autenticação + permissão ADMIN
router.use(authMiddleware);
router.use(isAdmin);

// GET /api/admin/reports
router.get("/reports", adminController.gerarRelatorios);

module.exports = router;
