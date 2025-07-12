const prisma = require("../config/prisma");

const listarLogs = async (req, res) => {
  try {
    const logs = await prisma.adminLog.findMany({
      orderBy: { timestamp: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar logs administrativos." });
  }
};

module.exports = {
  listarLogs,
};
