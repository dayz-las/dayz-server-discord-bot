const request = require('request')

exports.getTitle = () => {
    return new Promise((resolve, reject) => {
        request(process.env.TITLE_ENDPOINT, (err, res, body) => {
            body = JSON.parse(body)
            if(!err && body){
                resolve(body.fields)
            }else{
                reject(err)
            }
        })
    })
}