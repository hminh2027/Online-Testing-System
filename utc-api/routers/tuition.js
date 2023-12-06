const express = require('express')
const router = express.Router()
const tuition = require('../controllers/tuition')

router.post('/paid', tuition.getPaidTuition)
router.post('/debt', tuition.getTuitionDebt)
router.post('/', tuition.getTuition)

module.exports = router