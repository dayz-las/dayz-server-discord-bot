exports.logginCredentials = (client) => {
    setActivityBot(client);
    console.log("DayZBOT ON!");
}

let setActivityBot = (client) => {
    client.user.setActivity("!ayuda");
}