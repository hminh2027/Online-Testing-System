const moment = require('moment')

module.exports.stringHandler = (schedule, year, month, day) => {
    let today
    if (year && month && day) {
        const date = new Date(year, month - 1, day)
        today = moment(date)
    }
    else today = moment()
    
    let finalSchedule = [[],[],[],[],[],[]]

    schedule.map(e=>{
        const periodAndStudyDays = e.time.split('\Từ')
        periodAndStudyDays.shift()

        periodAndStudyDays.map(periodAndStudyDay=>{
            const period = periodAndStudyDay && periodAndStudyDay.split(':')[0]
            const studyDays = periodAndStudyDay && periodAndStudyDay.split(':')[1].split('\Thứ')

            const startDate = period.split(' ')[1].trim()
            const finishDate = period.split(' ')[3].trim()
            
            const isStudying = today.diff(moment(startDate, "DD/MM/YYYY"), 'days') >= 0 && today.diff(moment(finishDate, "DD/MM/YYYY"), 'days') <= 0

            if(isStudying) {
                studyDays.shift()

                studyDays.map(d=>{
                    if(!d) return
                    const day = d.split('tiết')[0].trim()
                    const shift = d.split('tiết')[1].trim().split(',').pop().match(/^\d+/g)/3
                    
                    finalSchedule[day-2].push({
                        subject: e.subject.split('-')[0],
                        shift
                    })
                })
            }
        })
    })

    finalSchedule.map(obj => obj.sort((a, b) => a.shift - b.shift))

    return finalSchedule
}