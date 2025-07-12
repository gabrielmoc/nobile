const prisma = require("../config/prisma");

const logAdminAction = async (userId, action) => {
  try {
    await prisma.adminLog.create({
      data: {
        userId,
        action,
      },
    });
  } catch (err) {
    console.error("Erro ao registrar log admin:", err);
  }
};

module.exports = logAdminAction;
