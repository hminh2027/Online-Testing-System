const { getHTML } = require("../getHTML")
const { getMarks, getGPA, getExam, getMarkCredential } = require("../htmlHandler")

module.exports.getMarks = async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    const {grade} = req.params

    try {
        const html = await getHTML(username, password, 'StudentMark.aspx')
        const data = await getMarks(html, grade)

        return res.status(200).json({data, error:''})

    } catch (err) {
        return res.json({data: '', error: err})
    }  
}

module.exports.getGPA = async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    const {year} = req.params

    try {
        const html = await getHTML(username, password, 'StudentMark.aspx')
        const data = await getGPA(html, year)

        return res.status(200).json({data, error:''})

    } catch (err) {
        return res.json({data: '', error: err})
    }  
}

module.exports.getExam = async (req,res)=>{
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({data: '', error: 'Username or password not found!'})

    try {
        const html = await getHTML(username, password, 'StudentMark.aspx')
        const credential = await getMarkCredential(html)
        const html2 = await getHTML(username, password, 'StudentMark.aspx', credential)
   
        const data = await getExam(html2)
        
        return res.status(200).json({data, error:''})

    } catch (err) {
        console.log(err)
        return res.json({data: '', error: err})
    }
}