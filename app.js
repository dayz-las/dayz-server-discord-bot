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
    sayHello(member)
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
                let thumbnail = 'https://fontmeme.com/images/Dayz-Game.jpg'
                let fields = [{
                    name: 'Nombre del servidor',
                    value: 'DayZ LAS (SCL)'
                },
                {
                    name: 'Mods',
                    value: 'No, el servidor es vanilla'
                },
                {
                    name: 'Ciclo día/noche',
                    value: '2/1 Hora tiempo real'
                },
                {
                    name: 'Persistencia',
                    value: 'Sí'
                },
                {
                    name: 'Uptime',
                    value: '24/7'
                },
                {
                    name: 'Dirección IP',
                    value: '[Click aquí para obtener la IP actual del servidor](https://www.trackyserver.com/server/dayz-las-450840)'
                }]
                sendEmbedMessage(createEmbedMessage('Información del servidor', fields, thumbnail, undefined), message)
                break
            }
            case 'sugerencia': {
                sendMentionMessage('si tienes ideas o mejoras para que el servidor siga creciendo, no dudes en dejar tu comentario en el canal de #sugerencias', message)
                break
            }
            case 'ayuda': {
                let ayuda = createHelp()
                sendMentionMessage(':incoming_envelope: **Inbox**', message)
                message.author.send(createEmbedMessage(undefined, ayuda, undefined, undefined))
                break
            }
            case 'ip': {
                getIpByDomainName(serverDomainName)
                    .then(ip => sendMentionMessage(`La direccion del servidor es: ${ip}:2302`, message))
                    .catch(() => sendMentionMessage('No se ha podido obtener la ip del servidor, si tienes problemas para ingresar por favor informanos en el canal de #ayuda', message))
                console.log(title.bienvenido.stringValue)
                break
            }
            default: {
                sendMentionMessage('no existe ese comando', message)
            }
        }
    } catch (err) {
        sendMentionMessage('ocurrió un error', message)
        sendErrorConsole(err)
    }
})