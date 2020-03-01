const { Client } = require("discord.js");
const { logginCredentials } = require("./src/discord/ready.js");
const {
  createEmbedMessage,
  createHelp,
  sendMentionMessage,
  sendEmbedMessage,
  createInfo
} = require("./src/discord/message.js");
const { sayHello } = require("./src/discord/memberAdd.js");
const {
  sendErrorConsole,
  getIpByDomainName
} = require("./src/helper/utils.js");
const { getTitle } = require("./src/firebase/getTitle.js");
const config = require("./config.json");
const { searchItemInWiki } = require("./src/wiki/search");
const prefix = config.discord.prefix;
const serverDomainName = "dayz.moralesm.cl";
const client = new Client();

var title;

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  logginCredentials(client);
  getTitle()
    .then(result => {
      title = result;
    })
    .catch(err => {
      console.log(err + err);
    });
});

client.on("guildMemberAdd", member => {
  sayHello(member, title);
  addMemberToRole(member);
});

client.on("message", message => {
  try {
    if (message.author.equals(client.user)) {
      return;
    }
    if (!message.content.startsWith(prefix)) {
      return;
    }
    let args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
      case "info": {
        let thumbnail = title.thumbnailValue.stringValue;
        let fields = createInfo(title);
        let footer = {
          text: `Información solicitada por ${message.author.username}`,
          icon: message.author.avatarURL
        };
        sendEmbedMessage(
          createEmbedMessage(
            title.infoTitle.stringValue,
            fields,
            thumbnail,
            footer
          ),
          message
        );
        break;
      }
      case "sugerencia": {
        sendMentionMessage(title.suggestion.stringValue, message);
        break;
      }
      case "ayuda": {
        let footerHelp = {
          text: `Gracias por jugar en DayZ LAS,  ${message.author.username}`,
          icon: message.author.avatarURL
        };
        let ayuda = createHelp(title);
        sendEmbedMessage(
          createEmbedMessage(
            title.helpServidorTitle.stringValue,
            ayuda,
            title.thumbnailHelpValue.stringValue,
            footerHelp
          ),
          message
        );
        break;
      }
      case "ip": {
        getIpByDomainName(serverDomainName)
          .then(ip =>
            sendMentionMessage(
              `${title.ipMessage.stringValue} ${ip}${title.port.stringValue}`,
              message
            )
          )
          .catch(error => {
            sendErrorConsole(error);
            sendMentionMessage(title.ipError.stringValue, message);
          });
        break;
      }
      case "wiki": {
        searchItemInWiki(message, title, args);
        break;
      }
      default: {
        sendMentionMessage(title.commandFalse.stringValue, message);
      }
    }
  } catch (err) {
    sendMentionMessage(title.generalError.stringValue, message);
    sendErrorConsole(err);
  }
});
