const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

// Define the routes
router.post('/student', express.json(), familyController.addStudent);
router.get('/students', familyController.getStudents);
router.get('/students/:id', familyController.getStudentProfile);

module.exports = router;
