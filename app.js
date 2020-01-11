const { Client } = require('discord.js');
const { logginCredentials } = require('./src/discord/ready');
const { createEmbedMessage, createHelp, sendMentionMessage, sendNormalMessage, sendEmbedMessage } = require('./src/discord/message');
const { sayHello } = require("./src/discord/memberAdd");
const { sendErrorConsole } = require('./src/helper/utils');
const config = require('./config.json');

const prefix = config.discord.prefix;
const client = new Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    logginCredentials(client);
});

client.on("guildMemberAdd", (member) => {
    sayHello(member);
});


client.on('message', (message) => {
    let fields;
    try {
        if (message.author.equals(client.user)) {
            return;
        }
        if (!message.content.startsWith(prefix)) {
            return;
        }
        let args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "info":
                let thumbnail = "https://fontmeme.com/images/Dayz-Game.jpg";
                let fields = [{
                    name: "Nombre del servidor",
                    value: "DayZ LAS (SCL)"
                },
                {
                    name: "Mods",
                    value: "No, el servidor es vanilla"
                },
                {
                    name: "Ciclo día/noche",
                    value: "2/1 Hora tiempo real"
                },
                {
                    name: "Persistencia",
                    value: "Sí"
                },
                {
                    name: "Uptime",
                    value: "24/7"
                },
                {
                    name: "Dirección IP",
                    value: `[Click aquí para obtener la IP actual del servidor](https://www.trackyserver.com/server/dayz-las-450840)`
                }]
                sendEmbedMessage(createEmbedMessage("Información del servidor", fields, thumbnail, undefined), message);
                break;
            case "sugerencia":
                sendMentionMessage('si tienes ideas o mejoras para que el servidor siga creciendo, no dudes en dejar tu comentario en el canal de #sugerencia', message);
                break;
            case "ayuda":
                fields = createHelp();
                sendMentionMessage(':incoming_envelope: **Inbox**', message);
                message.author.send(createEmbedMessage(undefined, fields, undefined, undefined));
                break;
            default:
                sendMentionMessage('no existe ese comando', message);
        }
    } catch (err) {
        sendMentionMessage('ocurrió un error', message);
        sendErrorConsole(err);
    }
});