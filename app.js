const { Client } = require('discord.js')
import { logginCredentials } from './src/discord/ready.js'
import { createEmbedMessage, createHelp, sendMentionMessage, sendEmbedMessage } from './src/discord/message.js'
import { sayHello } from './src/discord/memberAdd.js'
import { sendErrorConsole, getIpByDomainName } from './src/helper/utils.js'
import { getTitle } from './src/firebase/getTitle.js'
const config = require('./config.json')

const prefix = config.discord.prefix
const serverDomainName = 'dayz.moralesm.cl'
const client = new Client()
var title

client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
    logginCredentials(client)
    getTitle().then((result) => {
        title = result
    }).catch((err) => {
        console.log(err)
    })
})

client.on('guildMemberAdd', (member) => {
    sayHello(member, title)
})


client.on('message', (message) => {
    try {
        if (message.author.equals(client.user)) {
            return
        }
        if (!message.content.startsWith(prefix)) {
            return
        }
        let args = message.content.substring(prefix.length).split(' ')

        switch (args[0].toLowerCase()) {
            case 'info': {
                let thumbnail = title.thumbnailValue.stringValue
                let fields = [{
                    name: title.serverNameTitle.stringValue,
                    value: title.serverNameValue.stringValue
                },
                {
                    name: title.serverModTitle.stringValue,
                    value: title.serverModValue.stringValue
                },
                {
                    name: title.dayCycleTitle.stringValue,
                    value: title.dayCycleValue.stringValue
                },
                {
                    name: title.persistenceTitle.stringValue,
                    value: title.persistenceTitleValue.stringValue
                },
                {
                    name: title.uptimeTitle.stringValue,
                    value: title.upTimeValue.stringValue
                }]
                sendEmbedMessage(createEmbedMessage(title.infoTitle.stringValue, fields, thumbnail, undefined), message)
                break
            }
            case 'sugerencia': {
                sendMentionMessage(title.suggestion.stringValue, message)
                break
            }
            case 'ayuda': {
                let ayuda = createHelp(title)
                sendMentionMessage(title.helpChannelMessage.stringValue, message)
                message.author.send(createEmbedMessage(undefined, ayuda, undefined, undefined))
                break
            }
            case 'ip': {
                getIpByDomainName(serverDomainName)
                    .then(ip => sendMentionMessage(`${title.ipMessage.stringValue} ${ip}${title.port.stringValue}`, message))
                    .catch((error) => {
                        sendErrorConsole(error)
                        sendMentionMessage(title.ipError.stringValue, message)
                    })
                break
            }
            default: {
                sendMentionMessage(title.commandFalse.stringValue, message)
            }
        }
    } catch (err) {
        sendMentionMessage(title.generalError.stringValue, message)
        sendErrorConsole(err)
    }
})