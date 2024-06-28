const express = require('express');
const router = express.Router();
const studentsController = require('../app/controllers/StudentsController');
const upload = require('../config/uploadStudentImgonfig');

router.get('/details/:id', studentsController.details);
router.get('/create', studentsController.create);
router.post('/saved', upload.single('image'), studentsController.save);
router.get('/:id/edit', studentsController.edit);
router.delete('/:id', studentsController.destroy);
router.put('/:id', upload.single('image'), studentsController.submit);
router.get('/', studentsController.edit);

module.exports = router;
