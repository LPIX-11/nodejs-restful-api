const express = require("express");
const app = express();
const db = require("./db");

const Log = require("./util/log");

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;


const UserController = require("./app/user/user-controller");
app.use("/users", UserController);

const AuthController = require("./app/auth/authentification-controller");
app.use("/auth", AuthController);

app.listen(port, () => Log.i(`Nodejs Restful API running in [${env}] on ${port}`));

module.exports = app;