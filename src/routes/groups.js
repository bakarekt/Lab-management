const express = require('express');
const router = express.Router();
const groupsController = require('../app/controllers/GroupsController');

router.get('/details/:id', groupsController.details);
router.get('/create', groupsController.create);
router.post('/saved', groupsController.save);
router.get('/:id/edit', groupsController.edit);
router.delete('/:id', groupsController.destroy);
router.put('/:id', groupsController.submit);
router.get('/', groupsController.edit);

module.exports = router;
