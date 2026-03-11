const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');

router.get('/', curriculumController.getCurriculum);
router.post('/update', curriculumController.updateProgress); // NEW: Progress update route

module.exports = router;
