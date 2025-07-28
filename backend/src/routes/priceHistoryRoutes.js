const express = require("express");
const router = express.Router();
const {
  listarHistoricoPorRelogio,
} = require("../controllers/priceHistoryController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

/**
 * @swagger
 * /api/price-history/{watchId}:
 *   get:
 *     summary: Lista o histórico de preço de um relógio
 *     tags: [Histórico de Preço]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: watchId
 *         in: path
 *         required: true
 *         description: ID do relógio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico de preço retornado com sucesso
 *       404:
 *         description: Relógio não encontrado
 */
router.get("/:watchId", listarHistoricoPorRelogio); // GET /api/price-history/:watchId

module.exports = router;
