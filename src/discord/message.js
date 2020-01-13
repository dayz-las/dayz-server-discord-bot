const { RichEmbed } = require('discord.js');

exports.createEmbedMessage = (author = undefined, fields = undefined, thumbNail = undefined, footer = undefined) => {
    let embed = new RichEmbed();

    if (undefined != author) {
        embed.setAuthor(author);
    }

    if (fields.length > 0 && undefined != fields) {
        for (const field of fields) {
            embed.addField(field.name, " " + field.value)
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
}

exports.sendMentionMessage = (text, message) => {
    message.channel.send(`${message.author.toString()} ` + text);
}

exports.sendNormalMessage = (text, message) => {
    message.channel.send(text);
};

exports.createHelp = () => {
    let help = [{
        name: "Servidor",
        value: "`!info` `!sugerencia` `!ip`"
    }]

    return help;
}

exports.sendEmbedMessage = (embed, message) => {
    message.channel.send(embed);
}