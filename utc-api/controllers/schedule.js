const { getHTML } = require('../getHTML')
const { getSchedule, getScheduleCredential, getExamSchedule } = require('../htmlHandler')
const { stringHandler } = require('../stringHandler')

module.exports.getAllSchedule = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {      
        const html = await getHTML(username, password, 'StudyRegister/StudyRegister.aspx')
        const data = getSchedule(html)

        if (!data) return res.status(200).json({data: [], error:''})

        if (data.every(e => e.length === 0)) return res.status(200).json({data: 'No schedule found!', error:''})

        return res.status(200).json({data, error:''})

    } catch (err) {
        console.log(err)
        return res.status(err.status).json({data: '', error: err.body})
    }  
}

module.exports.getScheduleOfToday = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {      
        const html = await getHTML(username, password, 'StudyRegister/StudyRegister.aspx')
        const data = getSchedule(html)
        const finalData = stringHandler(data)

        if (finalData.every(e => e.length === 0)) return res.status(200).json({data: 'No schedule found!', error:''})

        return res.status(200).json({data: finalData, error:''})

    } catch (err) {
        return res.status(err.status).json({data: '', error: err.body})
    }  
}

module.exports.getScheduleOfDay = async (req, res) => {
    const {username, password} = req.body
    const {year, month, day} = req.query

    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})
    if (!day) return res.status(400).json({data: '', error: 'Day not found!'})

    try {      
        const html = await getHTML(username, password, 'StudyRegister/StudyRegister.aspx')
        const data = await getSchedule(html)
        const finalData = stringHandler(data, year, month, day)
        if (finalData.every(e => e.length === 0)) return res.status(200).json({data: 'No schedule found!', error:''})

        return res.status(200).json({data: finalData, error:''})

    } catch (err) {
        console.log(err)
        return res.status(err.status).json({data: '', error: err.body})
    }  
}

module.exports.getExamSchedule = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {
        const html = await getHTML(username, password, 'StudentViewExamList.aspx')
        const credential = await getScheduleCredential(html)

        const html2 = await getHTML(username, password, 'StudentViewExamList.aspx', credential)
   
        const data = await getExamSchedule(html2)
        if (data.length === 0) return res.status(200).json({data: 'No schedule exam found!', error:''})

        return res.status(200).json({data: data, error:''})

    } catch (err) {
        console.log(err)
        return res.status(err.status).json({data: '', error: err.body})
    }  
}