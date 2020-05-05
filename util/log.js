(function () {
    'use strict';

    const winston = require('winston');
    const morgan = require('morgan');
    const moment = require('moment');

    const morganFormat = `:date[iso] - /:method :url HTTP/:http-version :status :response-time ms - :res[content-length]`;
    const env = process.env.NODE_ENV;

    const logger = new(winston.Logger)({
        transports: [
            new(winston.transports.Console)({
                timestamp: moment(),
                level: 'silly',
                colorize: true
            })
        ]
    });

    function Log(app) {
        if (env !== 'test') {
            app.use(morgan(morganFormat));
        }
    }

    Log.show = (level, message) => {
        if (env !== 'test') {
            logger.log(level, message);
        }
    };

    /**
     * Logs an Error Message on the server console
    */
    Log.e = message => {
        Log.show('error', message);
    };

    /**
     * Logs a Warning Message on the server console
     */
    Log.w = message => {
        Log.show('warn', message);
    };

    /**
     * Logs an Information Message on the console
     */
    Log.i = message => {
        Log.show('info', message);
    };

    /**
     * Logs an Verbosed Message on the console
     */
    Log.v = message => {
        Log.show('verbose', message);
    };

    /**
     * Logs a Debug Message on the server console
     */
    Log.d = message => {
        Log.show('debug', message);
    };

    /**
     * Use this if you want a Silly Level Message to display on the server console
     */
    Log.s = message => {
        Log.show('silly', message);
    };

    module.exports = Log;

}());