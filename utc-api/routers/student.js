const express = require('express')
const router = express.Router()
const student = require('../controllers/student')

router.post('/', student.getStudent)

module.exports = router