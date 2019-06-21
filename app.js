var express = require("express");
var app = express();
var db = require("./db");

var UserController = require("./app/user/user-controller");
app.use("/users", UserController);

var AuthController = require("./app/auth/authentification-controller");
app.use("/auth", AuthController);

module.exports = app;