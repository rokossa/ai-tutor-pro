const express = require('express');
const router = express.Router();

// Health Check
router.get('/health', (req, res) => res.status(200).json({ status: 'ok', message: 'AI Tutor Pro API is live.' }));

// Core Routes
router.use('/auth', require('./auth'));       // <-- This is the route returning the 404!
router.use('/family', require('./family'));
router.use('/ai', require('./ai'));
router.use('/stripe', require('./stripe'));

module.exports = router;
