const request = require('request')

module.exports.getRequest = (cookie, url) => {
    const headers = {
        'Cookie': cookie
    }
    
    const options = {
        url,
        method: 'GET',
        headers
    }
    
    return new Promise((resolve, reject) => {
        request(options, (error ,response, body)=>{
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
            else reject({status: 400, body: 'Get request failed!'})
        })
    })
}

module.exports.postRequest = (cookie, url, credential) => {
    const headers = {
        'Cookie': cookie
    }
    
    const options = {
        url,
        method: 'POST',
        headers,
        formData: credential
    }

    return new Promise((resolve, reject) => {
        request(options, (error ,response, body)=>{
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
            else reject({status: 400, body: 'Post request failed!'})
        })
    })
}