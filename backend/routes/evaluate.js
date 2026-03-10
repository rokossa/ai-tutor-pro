const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// This explicitly maps the POST request to the controller we wrote earlier
router.post('/', evaluationController.checkAnswer);

module.exports = router;
