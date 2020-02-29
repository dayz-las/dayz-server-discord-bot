const getServerStatusUseCase = require("../domain/get-server-status.usecase");

exports.getServerStatusController = (req, res) => {
  getServerStatusUseCase.execute().then(serverStatus => {
    res.send({
      name: serverStatus.name,
      map: serverStatus.map,
      version: serverStatus.version,
      online: serverStatus.online,
      maxPlayers: serverStatus.maxPlayers,
      currentPlayers: serverStatus.currentPlayers
    });
  });
};
