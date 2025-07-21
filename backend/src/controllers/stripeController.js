const prisma = require("../config/prisma");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const criarCheckout = async (req, res) => {
  try {
    const { orderId } = req.params;
    const protocol = req.protocol;
    const host = req.get("host");

    // Busca o pedido no banco
    const pedido = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        watch: true,
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `${pedido.watch.brand} ${pedido.watch.model}`,
            },
            unit_amount: Math.round(pedido.watch.price * 100), // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${protocol}://${host}/sucesso`,
      cancel_url: `${protocol}://${host}/cancelado`,
      metadata: {
        orderId: pedido.id.toString(),
      },
    });

    res.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar sessão de pagamento." });
  }
};

/*
// Webhook desativado por enquanto
const webhookStripe = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Erro ao verificar assinatura do webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = parseInt(session.metadata.orderId);

    try {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "Pago" },
      });
      console.log(`Pedido ${orderId} marcado como pago`);
    } catch (err) {
      console.error("Erro ao atualizar pedido:", err.message);
    }
  }

  res.status(200).json({ received: true });
};
*/

const verificarPagamento = async (req, res) => {
  const { sessionId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const orderId = parseInt(session.metadata.orderId);

      await prisma.order.update({
        where: { id: orderId },
        data: { status: "Pago" },
      });

      return res.json({
        success: true,
        message: "Pagamento confirmado e pedido atualizado para 'Pago'.",
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Pagamento ainda não foi concluído.",
        });
    }
  } catch (err) {
    console.error("Erro ao verificar pagamento:", err.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Erro interno ao verificar pagamento.",
      });
  }
};

module.exports = {
  criarCheckout,
  verificarPagamento,
};
