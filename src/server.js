const express = require("express");
const app = (exports.app = express());
const {
  getServerStatusController
} = require("./presenter/server-status.controller");

exports.start = function() {
  app.listen(8080);
};

app.get("/api/server/status", getServerStatusController);
