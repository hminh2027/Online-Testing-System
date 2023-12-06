const cheerio = require('cheerio')

module.exports.getSchedule = (html) => {
    let data = []
    const $ = cheerio.load(html)

    $('.cssRangeItem3', html).each((index, elem)=>{
        const subject = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const time = $(elem).find('td:eq(4)').text().replace(/\n/g, '').replace(/\t/g, '').trim()

        data.push({subject, time})
    })

    if(data.length === 0) {
        $('#tblOtherRegister tr', html).find('tr:not(:last-child)').not('.DataGridFixedHeader').each((index, elem)=>{
            const subject = $(elem).find('td:eq(1)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
            const time = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
    
            data.push({subject, time})
        })
    }

    return data
}

module.exports.getExamSchedule = (html) => {
    let data = []
    const $ = cheerio.load(html)

    $('#tblCourseList', html).find('tr:not(:last-child)').not('.DataGridFixedHeader').each((index, elem)=>{
        const subject = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const date = $(elem).find('td:eq(4)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const time = $(elem).find('td:eq(5)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const examForm = $(elem).find('td:eq(6)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const orderID = $(elem).find('td:eq(7)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const place = $(elem).find('td:eq(8)').text().replace(/\n/g, '').replace(/\t/g, '').trim()

        data.push({subject, date, time, examForm, orderID, place})
    })

    return data
}

module.exports.getStudent = (html) => {
    let data = {}
    const $ = cheerio.load(html)

    data.lastName = $('#txtHoDem', html).val().trim()
    data.firstName = $('#txtTen', html).val().trim()
    data.gender = $('#gioitinh', html).text().trim()
    data.studentId = $('#txtMaSV', html).val().trim()
    data.studentBankAccount = $('#txtSoTaiKhoanNganHang', html).val().trim()
    data.identityCard = $('#txtCMTND', html).val().trim()
    data.birth = $('#txtNgaySinh', html).val().trim()
    data.bornIn = $('#txtNoiSinh', html).val().trim()
    data.country = $('#drpQuocTich', html).find('option[selected=selected]').text().trim()
    data.tel = $('#txtDienThoaiCaNHAN', html).val().trim()
    data.email = $('#txtEmail', html).val().trim()

    return data
}

module.exports.getMarks = (html, grade) => {
    let data = []
    const $ = cheerio.load(html)

    $('#tblStudentMark', html).find('tr').not('.DataGridFixedHeader').each((index, elem)=>{
        let mark = $(elem).find('td:eq(12)').html()
        const subject = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const credit = $(elem).find('td:eq(3)').text()

        if(!mark) return
        mark = mark.split('<br>').pop()

        if (grade)
        switch (grade) {
            case 'A':
            case 'a':
                mark >= 8.5 && data.push({subject, mark, credit})
                break
            case 'B':
            case 'b':
                (7 <= mark && mark <= 8.4) && data.push({subject, mark, credit})
                break
            case 'C':
            case 'c':
                (5.5 <= mark && mark <= 6.9) && data.push({subject, mark, credit})
                break
            case 'D':
            case 'd':
                (4 <= mark && mark <= 4.9) && data.push({subject, mark, credit})
                break
            case 'F':
            case 'f':
                (mark < 4) && data.push({subject, mark, credit})
                break
            default:
                break
        }

        else data.push({subject, mark, credit})
    })
    
    return data
}

module.exports.getGPA = (html, year) => {
    let data = {detailGPA:[], GPA: {}}
    const $ = cheerio.load(html)

    if (!year) 
        $('#grdResult', html).find('tr').not('tr:eq(0), tr:last').each((index, elem)=>{
            const year = $(elem).find('td:eq(0)').text()
            const term = $(elem).find('td:eq(1)').text()
            const scaleOf10 = $(elem).find('td:eq(2)').text()
            const scaleOf4 = $(elem).find('td:eq(4)').text()
            const credit = $(elem).find('td:eq(12)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
            
            data.detailGPA.push({year, term, scaleOf10, scaleOf4, credit})
        })
    
    else
        $('#grdResult', html).find(`tr:eq(${(year*3)}), tr:eq(${(year*3)-1}), tr:eq(${(year*3)-2})`).not('tr:last').each((index, elem)=>{
            const year = $(elem).find('td:eq(0)').text()
            const term = $(elem).find('td:eq(1)').text()
            const scaleOf10 = $(elem).find('td:eq(2)').text()
            const scaleOf4 = $(elem).find('td:eq(4)').text()
            const credit = $(elem).find('td:eq(12)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
            
            data.detailGPA.push({year, term, scaleOf10, scaleOf4, credit})
        })

    $('#grdResult', html).find('tr:last').each((index, elem)=>{
        const scaleOf10 = $(elem).find('td:eq(2)').text()
        const scaleOf4 = $(elem).find('td:eq(4)').text()
        const credit = $(elem).find('td:eq(12)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
            
        data.GPA = {scaleOf10, scaleOf4, credit}
    })
    
    return data
}

module.exports.getExam = (html) => {
    let data = []
    const $ = cheerio.load(html)

    $('#tblStudentMark', html).find('tr:not(:last-child)').not('.DataGridFixedHeader').each((index, elem)=>{
        let mark = $(elem).find('td:eq(10)').html()
        const subject = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const credit = $(elem).find('td:eq(3)').text()
        data.push({subject, mark, credit})
    })
    
    return data
}

module.exports.getTuition = (html) => {
    let data = {tuition: [], total: 0}
    const $ = cheerio.load(html)

    $('#tblTotalDueAmount', html).find('tr:not(:last-child)').not('.DataGridFixedHeader').each((index, elem)=>{
        const term = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const attempt = $(elem).find('td:eq(3)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const amount = $(elem).find('td:eq(4)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        
        data.tuition.push({term, attempt, amount})
    })

    data.total = $('#lblDueAmount', html).text().match(/\d/g).join('')
    
    return data
}

module.exports.getPaidTuition = (html) => {
    let data = {tuition: [], total: 0}
    const $ = cheerio.load(html)

    $('#tblPaid', html).find('tr:not(:last-child)').not('.DataGridFixedHeader').each((index, elem)=>{
        const term = $(elem).find('td:eq(3)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const attempt = $(elem).find('td:eq(4)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const date = $(elem).find('td:eq(5)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const amount = $(elem).find('td:eq(6)').text().replace(/\n/g, '').replace(/\t/g, '').trim()

        data.tuition.push({term, attempt, date, amount})
    })

    data.total = $('#lblPaidAmount', html).text().match(/\d/g).join('')
    
    return data
}

module.exports.getTuitionDebt = (html) => {
    let data = {tuition: [], total: 0}
    const $ = cheerio.load(html)

    $('#tblDueAmount', html).find('tr:not(:last-child)').not('.DataGridFixedHeader').each((index, elem)=>{
        const term = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const attempt = $(elem).find('td:eq(3)').text().replace(/\n/g, '').replace(/\t/g, '').trim()
        const amount = $(elem).find('td:eq(4)').text().replace(/\n/g, '').replace(/\t/g, '').trim()

        data.tuition.push({term, attempt, amount})
        data.total += amount

        console.log($(elem).html())
    })
    
    return data
}

module.exports.getMarkCredential = (html) => {
    let data = {}
    const $ = cheerio.load(html)

    data.__VIEWSTATE = $('#__VIEWSTATE', html).val()
    data.__EVENTTARGET = 'drpHK'
    data.__VIEWSTATEGENERATOR = $('#__VIEWSTATEGENERATOR', html).val()
    data.hidFieldId = $('#hidFieldId', html).val()
    data.hidFieldName = $('#hidFieldName', html).val()
    data.__EVENTVALIDATION = $('#__EVENTVALIDATION', html).val()
    data.hidStudentId = $('#hidStudentId', html).val()
    data.hidSymbolMark = $('#hidSymbolMark', html).val()
    data.drpHK = $('#drpHK').find('option:last').val()

    return data
}

module.exports.getScheduleCredential = (html) => {
    let data = {}
    const $ = cheerio.load(html)

    data.__VIEWSTATE = $('#__VIEWSTATE', html).val()
    data.__EVENTTARGET = 'drpHK'
    data.__VIEWSTATEGENERATOR = $('#__VIEWSTATEGENERATOR', html).val()
    data.__EVENTVALIDATION = $('#__EVENTVALIDATION', html).val()
    data.hidStudentId = $('#hidStudentId', html).val()
    data.drpSemester = $('#drpSemester').find('option:eq(2)').val()

    return data
}