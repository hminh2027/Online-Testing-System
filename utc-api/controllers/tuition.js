const { getHTML } = require("../getHTML")
const { getTuition, getPaidTuition, getTuitionDebt } = require("../htmlHandler")

module.exports.getTuition = async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {
        const html = await getHTML(username, password, 'StudentService/StudentTuitionv2.aspx')
        const data = await getTuition(html)

        return res.status(200).json({data, error:''})

    } catch (err) {
        return res.status(err.status).json({data: '', error: err.body})
    }  
}

module.exports.getPaidTuition = async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {
        const html = await getHTML(username, password, 'StudentService/StudentTuitionv2.aspx')
        const data = await getPaidTuition(html)

        return res.status(200).json({data, error:''})

    } catch (err) {
        return res.status(err.status).json({data: '', error: err.body})
    }  
}

module.exports.getTuitionDebt = async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {
        const html = await getHTML(username, password, 'StudentService/StudentTuitionv2.aspx')
        const data = await getTuitionDebt(html)

        return res.status(200).json({data, error:''})

    } catch (err) {
        return res.status(err.status).json({data: '', error: err.body})
    }  
}