(function () {
    'use strict';

    require('dotenv').config();
    require('./util/constants/config');

    const app = require('express')();
    const bodyParser = require('body-parser');
    const port = process.env.PORT;
    const env = process.env.NODE_ENV;
    const baseUrl = process.env.BASE_URL + '/' + process.env.VERSION;
    const db = require('./util/DataBaseHelper');
    // jwt Authentification
    const bearerToken = require('express-bearer-token');
    const validator = require('express-validator');

    const Log = require('./util/log');
    new Log(app);
    const log = Log;

    app.use(bodyParser.json());
    app.use(validator());
    app.use(bearerToken());

    // Main router
    app.use(baseUrl, require('./routes'));

    app.listen(port, () => log.i(`Nodejs Restful API running in [${env}] on ${port}`));

    module.exports = app;
}());