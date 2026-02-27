const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok', message: 'AI Tutor Pro API is live.' }));

module.exports = router;
