const prisma = require("../config/prisma");

const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user || user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Acesso restrito a administradores." });
    }

    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erro ao verificar permissão de administrador." });
  }
};

module.exports = isAdmin;
