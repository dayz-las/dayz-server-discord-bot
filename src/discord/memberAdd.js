exports.sayHello = (member, title) => {
  member.guild.channels
    .find(role => role.name === "general")
    .send(member.toString() + title.welcome.stringValue);
};

exports.sendMessageToChannel = (member, nameChannel, message) => {
  member.guild.channels
    .find(role => role.name === nameChannel)
    .send(`${member.toString()}, ` + message);
};

exports.addMemberToRole = member => {
  let role = member.guild.roles.find(role => role.name === "Sobreviviente");
  member.addRole(role);
};
