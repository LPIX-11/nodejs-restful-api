"use strict";

const winston = require("winston");
const morgan = require("morgan");
const moment = require("moment");

const morganFormat = ":date[iso] - /:method :url HTTP/:http-version :status :response-time ms - :res[content-length]";
const env = process.env.NODE_ENV;

const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            timestamp: moment(),
            level: "silly",
            colorize: true
        })
    ]
});

function Log(app) {
    if (env !== "test") {
        app.use(morgan(morganFormat));
    }
}

Log.show = (level, message) => {
    if (env !== "test") {
        logger.log(level, message);
    }
};

// Error Message
Log.e = message => {
    Log.show("error", message);
};

// Warning Message
Log.w = message => {
    Log.show("warn", message);
};

// Information Message
Log.i = message => {
    Log.show("info", message);
};

// Verbose Message
Log.v = message => {
    Log.show("verbose", message);
};

// Debug Message
Log.d = message => {
    Log.show("debug", message);
};

// Silly Message
Log.s = message => {
    Log.show("silly", message);
};

module.exports = Log;