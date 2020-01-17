const request = require('request')

exports.getTitle = () => {
    return new Promise((resolve, reject) => {
        request(/*process.env.TITLE_ENDPOINT*/'https://firestore.googleapis.com/v1/projects/dayz-las/databases/(default)/documents/discord-bot/title/', (err, res, body) => {
            body = JSON.parse(body)
            if(!err && body){
                resolve(body.fields)
            }else{
                reject(err)
            }
        })
    })
}