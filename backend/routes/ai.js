const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Standard JSON endpoint for grading answers via Gemini
router.post('/grade', express.json(), aiController.gradeAnswer);

module.exports = router;
