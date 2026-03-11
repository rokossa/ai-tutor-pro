const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');

// GET request because we are fetching data, not posting it
router.get('/', curriculumController.getCurriculum);

module.exports = router;
