const express = require('express')
const router = express.Router()
const studentsController = require('../app/controllers/StudentsController')


router.get('/details/:id', studentsController.details)
router.get('/create', studentsController.create)
router.post('/saved', studentsController.save)
router.get('/:id/edit', studentsController.edit)
router.delete('/:id', studentsController.destroy)
router.put('/:id', studentsController.submit)
router.get('/', studentsController.edit)

module.exports = router