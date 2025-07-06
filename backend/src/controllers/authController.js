const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

const register = async (req, res) => {
  try {
    const { name, email, password, phone, country, state, city, role } = req.body;

    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        country,
        state,
        city,
        role: role?.toUpperCase() || 'BUYER',
      },
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso.',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      },
    });
  } catch (error) {
    console.error('Erro no register:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

module.exports = { register };