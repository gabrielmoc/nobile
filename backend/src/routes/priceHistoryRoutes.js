const express = require('express');
const router = express.Router();
const { listarHistoricoPorRelogio } = require('../controllers/priceHistoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// GET /api/price-history/:watchId
router.get('/:watchId', listarHistoricoPorRelogio);

module.exports = router;