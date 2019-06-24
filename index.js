require("dotenv").config();
require("./config");

const app = require("express")();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const env = process.env.NODE_ENV;
const baseUrl = process.env.BASE_URL + "/" + process.env.VERSION;

const db = require("./util/DataBaseHelper");

const Log = require("./util/log");
new Log(app);
const log = Log;

app.use(bodyParser.json());

console.log(baseUrl);
// const UserController = require("./app/user/user-controller");
// app.use("/users", UserController);
// app.use(baseUrl, require("./routes"));

const AuthController = require("./app/auth/authentification-controller");
app.use("/auth", AuthController);

app.listen(port, () => log.i(`Nodejs Restful API running in [${env}] on ${port}`));

module.exports = app;