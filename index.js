const express = require("express");
const app = express();
var db = require("./db");
const port = process.env.PORT || 3000;


var UserController = require("./app/user/user-controller");
app.use("/users", UserController);

var AuthController = require("./app/auth/authentification-controller");
app.use("/auth", AuthController);

app.listen(port, () => (console.log(`Nodejs Restful API running in ${port}`)));
module.exports = app;