const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// Standard JSON endpoint for the frontend to request a checkout URL
router.post('/create-checkout-session', express.json(), stripeController.createCheckoutSession);

// SECURE WEBHOOK ENDPOINT: Notice the express.raw() middleware!
// This overrides the global express.json() so Stripe can verify the raw buffer.
router.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook);

module.exports = router;
