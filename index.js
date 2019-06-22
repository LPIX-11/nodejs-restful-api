const express = require("express");

const app = express();
var db = require("./db");
const Log = require("./util/log");

// require("dotenv").config();
// require("./config");

const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV;


var UserController = require("./app/user/user-controller");
app.use("/users", UserController);

var AuthController = require("./app/auth/authentification-controller");
app.use("/auth", AuthController);

app.listen(port, () => Log.i(`Nodejs Restful API running in [${env}] on ${port}`));

module.exports = app;