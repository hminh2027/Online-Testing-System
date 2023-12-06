const express = require('express')
const router = express.Router()
const schedule = require('../controllers/schedule')

router.post('/', schedule.getAllSchedule)
router.post('/today', schedule.getScheduleOfToday)
router.post('/day', schedule.getScheduleOfDay)
router.post('/exam', schedule.getExamSchedule)


module.exports = router