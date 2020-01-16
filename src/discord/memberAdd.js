export function sayHello(member, title) {
	member.guild.channels.find(role => role.name === 'general').send(member.toString() + title.welcome.stringValue)
}

export function sendMessageToChannel(member, nameChannel, message) {
	member.guild.channels.find(role => role.name === nameChannel).send(`${member.toString()}, ` + message)
}
