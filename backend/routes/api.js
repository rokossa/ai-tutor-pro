const express = require('express');
const router = express.Router();
const db = require('../db');

// Import Controllers
const evaluationController = require('../controllers/evaluationController');
const exerciseController = require('../controllers/exerciseController');
const seedController = require('../controllers/seedController');

// 🧮 Math Evaluation Engine (SymPy)
router.post('/evaluate', evaluationController.checkAnswer);

// 🧠 Adaptive Exercise Generator (Gemini)
router.post('/exercise', exerciseController.getAdaptiveProblem);

// 🔌 Database Connection Health Check
router.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as current_time, current_database() as db_name');
    res.json({ success: true, message: 'Connection successful!', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Connection failed.', error: error.message });
  }
});

// 🌱 Seed Knowledge Graph Database
router.get('/seed-db', seedController.seedCalculusGraph);

module.exports = router;
