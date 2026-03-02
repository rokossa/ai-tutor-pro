const express = require('express');
const router = express.Router();
const { generateProblem } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, generateProblem);

module.exports = router;
