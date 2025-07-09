const prisma = require('../config/prisma');

const listarHistoricoPorRelogio = async (req, res) => {
  try {
    const { watchId } = req.params;

    const historico = await prisma.priceHistory.findMany({
      where: { watchId: parseInt(watchId) },
      orderBy: { date: 'desc' }
    });

    res.json(historico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar histórico de preços.' });
  }
};
module.exports = {
  listarHistoricoPorRelogio
};