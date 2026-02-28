const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/generate-exercise
router.post('/generate-exercise', aiController.generateCustomExercise);

module.exports = router;
