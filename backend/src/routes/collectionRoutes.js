const express = require('express');
const router = express.Router();
const {
  adicionarRelogioNaColecao,
  listarColecaoDoUsuario,
  atualizarValorEstimado,
  removerRelogioDaColecao
} = require('../controllers/collectionController');

const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas exigem usuário logado
router.use(authMiddleware);

// Adicionar relógio à coleção
router.post('/', adicionarRelogioNaColecao);

// Listar coleção do usuário logado
router.get('/', listarColecaoDoUsuario);

// Atualizar valor estimado de um relógio da coleção
router.put('/:id', atualizarValorEstimado);

// Remover relógio da coleção
router.delete('/:watchId', removerRelogioDaColecao);

module.exports = router;