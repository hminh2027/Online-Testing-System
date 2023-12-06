const schedule = require('./schedule')
const mark = require('./mark')
const student = require('./student')
const tuition = require('./tuition')

module.exports = (app) => {
    app.use('/schedule', schedule)
    app.use('/mark', mark)
    app.use('/student', student)
    app.use('/tuition', tuition)
}