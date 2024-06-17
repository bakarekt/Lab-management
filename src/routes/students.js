const express = require('express')
const router = express.Router()
const studentsController = require('../app/controllers/StudentsController')

router.get('/:id/edit', studentsController.edit)
router.put('/:id', studentsController.submit)
router.get('/', studentsController.edit)

module.exports = router