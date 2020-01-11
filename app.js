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
        if (message.author.equals(client.user) && !message.content.startsWith(prefix)) {
            return;
        }

        let args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "info":
                sendNormalMessage('que pongo aqui pipin :D', message);
                break;
            case 'ip':
                sendNormalMessage('La ip del servidor es: **190.21.247.138**', message);
                break;
            case 'mods':
                sendNormalMessage('Actualmente el servidor esta enfocado en vanilla', message)
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