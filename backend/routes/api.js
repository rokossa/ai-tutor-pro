const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok', message: 'AI Tutor Pro API is live.' }));

router.use('/auth', require('./auth'));
router.use('/family', require('./family'));
router.use('/ai', require('./ai'));
router.use('/stripe', require('./stripe')); // <-- Newly added Stripe routes

module.exports = router;
