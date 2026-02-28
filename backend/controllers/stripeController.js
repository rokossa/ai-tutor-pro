const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

// 1. Create Checkout Session (Triggered by frontend "Start Free Trial" button)
exports.createCheckoutSession = async (req, res) => {
  try {
    const { parentEmail, parentId } = req.body;

    // In a real app, replace 'price_xxx' with your actual Stripe Price ID for the $14.99 plan
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: parentEmail,
      client_reference_id: parentId, // Links the Stripe sub to your database user
      subscription_data: {
        trial_period_days: 14,
      },
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID || 'price_mock_1499', 
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/parent?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/pricing`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

// 2. Secure Webhook Handler (Triggered by Stripe behind the scenes)
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock';

  let event;

  try {
    // CRITICAL: req.body MUST be raw here. Express cannot have parsed it into JSON yet.
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`✅ Checkout Session completed for ${session.customer_email}!`);
      // TODO: Update user in database -> isPro: true, stripeCustomerId: session.customer
      break;
    
    case 'customer.subscription.deleted':
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      console.log(`🔄 Subscription status is now ${subscription.status}`);
      // TODO: If status is 'canceled', update user in database -> isPro: false
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Acknowledge receipt to Stripe
  res.json({ received: true });
};
