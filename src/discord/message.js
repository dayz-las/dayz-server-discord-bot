const { RichEmbed } = require("discord.js");

exports.createEmbedMessage = function (
  author = undefined,
  fields = undefined,
  thumbNail = undefined,
  footer = undefined
) {
  let embed = new RichEmbed();

  if (undefined != author) {
    embed.setAuthor(author);
  }

  if (fields.length > 0 && undefined != fields) {
    for (const field of fields) {
      embed.addField(field.name, " " + field.value);
    }
  }

  if (undefined != thumbNail) {
    embed.setThumbnail(thumbNail);
  }

  if (undefined != footer) {
    embed.setFooter(footer.text, footer.icon);
  }
  embed.setColor(0x860202);

  return embed;
};

exports.sendMentionMessage = (text, message) => {
  message.channel.send(`${message.author.toString()} ` + text);
};

exports.sendNormalMessage = (text, message) => {
  message.channel.send(text);
};

exports.createHelp = title => {
  let help = [
    {
      name: title.helpHowUseMessageTitle.stringValue,
      value: title.helpHowUseMessage.stringValue
    },
    {
      name: title.helpGeneralMessageTitle.stringValue,
      value: title.helpGeneralMessage.stringValue
    },
    {
      name: title.helpCommandTitle.stringValue,
      value: title.helpCommand.stringValue
    },
    {
      name: title.helpInfoCommandTitle.stringValue,
      value: title.helpInfoCommand.stringValue
    },
    {
      name: title.helpIpCommandTitle.stringValue,
      value: title.helpIpCommand.stringValue
    },
    {
      name: title.helpSugerenciaCommandTitle.stringValue,
      value: title.helpSugerenciaCommand.stringValue
    },
    {
      name: title.helpWikiCommandTitle.stringValue,
      value: title.helpWikiCommand.stringValue
    }
  ];

  return help;
};

exports.createInfo = (title) => {
  let fields = [
    {
      name: title.serverNameTitle.stringValue,
      value: title.serverNameValue.stringValue
    },
    {
      name: title.serverDescriptionTitle.stringValue,
      value: title.serverDescription.stringValue
    },
    {
      name: title.serverModTitle.stringValue,
      value: title.serverModValue.stringValue
    },
    {
      name: title.persistenceTitle.stringValue,
      value: title.persistenceTitleValue.stringValue
    },
    {
      name: title.dayCycleTitle.stringValue,
      value: title.dayCycleValue.stringValue
    },
    {
      name: title.rulesTitle.stringValue,
      value: title.rulesValue.stringValue
    }
  ];

  return fields;
};

exports.sendEmbedMessage = (embed, message) => {
  message.channel.send(embed);
};
