const prisma = require('../config/prisma');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const criarCheckout = async (req, res) => {
  try {
    const { orderId } = req.params;
    const protocol = req.protocol;
    const host = req.get('host');

    // Busca o pedido no banco
    const pedido = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        watch: true
      }
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `${pedido.watch.brand} ${pedido.watch.model}`
            },
            unit_amount: Math.round(pedido.watch.price * 100) // Stripe usa centavos
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${protocol}://${host}/sucesso`,
      cancel_url: `${protocol}://${host}/cancelado`
    });

    res.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento.' });
  }
};

module.exports = {
  criarCheckout
};