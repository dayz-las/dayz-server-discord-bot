exports.sayHello = function(member, title) {
  member.guild.channels
    .find(role => role.name === "general")
    .send(member.toString() + title.welcome.stringValue);
};

exports.sendMessageToChannel = function(member, nameChannel, message) {
  member.guild.channels
    .find(role => role.name === nameChannel)
    .send(`${member.toString()}, ` + message);
};
