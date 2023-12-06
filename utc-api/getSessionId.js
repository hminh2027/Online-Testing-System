const request = require('request')

module.exports.getSessionId = () => {
    const options = {
        url: 'https://qldt.utc.edu.vn/CMCSoft.IU.Web.Info/login.aspx',
        method: 'GET'
    }

    return new Promise((resolve, reject) => {
        request(options, (error ,response, body)=>{
            if (!error && response.statusCode == 200) {
                resolve(response.request.path.split('/')[2])          
            }
            else reject({status: 400, body: 'Get session id failed!'})
        })
    })
}