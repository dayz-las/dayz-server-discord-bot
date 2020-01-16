import request from 'request'

export function sendErrorConsole(error) {
    console.log('----------ERROR----------')
    console.log(error)
    console.log('----------FIN----------')
}

export function getIpByDomainName(name) {
    return new Promise((resolve, reject) => {
        request(`http://ip-api.com/json/${name}?fields=query`,
            (error, res, body) => {
                body = JSON.parse(body)
                if (!error && body && typeof body.query == 'string')
                    resolve(body.query)
                else {
                    const errorMessage = `Couldn't get IP Address for ${name}`
                    this.sendErrorConsole(error || errorMessage)
                    reject(errorMessage)
                }
            })
    })
} 