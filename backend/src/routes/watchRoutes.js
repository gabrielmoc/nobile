const express = require('express');
const router = express.Router();

const {
  criarRelogio,
  listarRelogios,
  buscarRelogioPorId,
  atualizarRelogio,
  excluirRelogio
} = require('../controllers/watchController');

const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary'); 

// Públicas:
router.get('/', listarRelogios);
router.get('/:id', buscarRelogioPorId);

// Privadas (exigem token):
router.post('/', authMiddleware, upload.single('image'), criarRelogio); 
router.put('/:id', authMiddleware, atualizarRelogio);
router.delete('/:id', authMiddleware, excluirRelogio);

module.exports = router;