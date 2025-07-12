const prisma = require("../config/prisma");

const gerarRelatorios = async (req, res) => {
  try {
    const totalUsuarios = await prisma.user.count();
    const totalRelogios = await prisma.watch.count();
    const totalPedidos = await prisma.order.count();
    const totalVendas = await prisma.order.count({
      where: {
        status: { in: ["pago", "entregue"] },
      },
    });

    res.json({
      totalUsuarios,
      totalRelogios,
      totalPedidos,
      totalVendas,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erro ao gerar relatórios administrativos." });
  }
};

module.exports = {
  gerarRelatorios,
};
