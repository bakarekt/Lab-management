const express = require('express');
const router = express.Router();
const projectsController = require('../app/controllers/ProjectsController');
const upload = require('../config/uploadProjectImgonfig');

router.get('/details/:id', projectsController.details);
router.get('/create', projectsController.create);
router.post('/saved', upload.single('image'), projectsController.save);
router.get('/:id/edit', projectsController.edit);
router.delete('/:id', projectsController.destroy);
router.put('/:id', upload.single('image'), projectsController.submit);
router.get('/', projectsController.edit);

module.exports = router;
