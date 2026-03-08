const express = require('express');
const router = express.Router();
const db = require('../db'); // Import our new PostgreSQL pool

// Import Controllers
const evaluationController = require('../controllers/evaluationController');
const exerciseController = require('../controllers/exerciseController');

// 🧮 Math Evaluation Engine (SymPy)
router.post('/evaluate', evaluationController.checkAnswer);

// 🧠 Adaptive Exercise Generator (Gemini)
router.post('/exercise', exerciseController.getAdaptiveProblem);

// 🔌 Database Connection Health Check
router.get('/test-db', async (req, res) => {
  try {
    // Run a lightweight query to verify the connection is active
    const result = await db.query('SELECT NOW() as current_time, current_database() as db_name');
    
    res.json({ 
      success: true, 
      message: 'Knowledge Graph Database connection successful!', 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('🔥 Database connection failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed. Check your DATABASE_URL environment variable.', 
      error: error.message 
    });
  }
});

module.exports = router;
