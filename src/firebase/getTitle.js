import request from 'request'

export function getTitle() {
    return new Promise((resolve, reject) => {
        request(process.env.ENDPOINT_DB, (err, res, body) => {
            body = JSON.parse(body)
            if(!err && body){
                resolve(body.fields)
            }else{
                reject(err)
            }
        })
    })
}