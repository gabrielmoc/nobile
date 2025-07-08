const express = require('express');
const router = express.Router();

const { enviarMensagem, listarMensagens } = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', enviarMensagem);
router.get('/', listarMensagens);

module.exports = router;