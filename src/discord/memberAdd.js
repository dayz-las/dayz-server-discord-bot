exports.sayHello = (member) => {
    member.guild.channels.find(role => role.name === "general").send(member.toString() + " Bienvenido al servidor **DayZ LAS (SCL)**, usa el comando `!ayuda` para obtener más información.");
}

exports.sendMessageToChannel = (member, nameChannel, message) => {
    member.guild.channels.find(role => role.name === nameChannel).send(`${member.toString()}, ` + message);
}
