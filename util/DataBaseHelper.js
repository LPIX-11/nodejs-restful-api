require("dotenv").config();
require("../util/constants/config");

const mongoose = require("mongoose");
const uri = process.env.DATABASE_URL;

const Log = require("./log");

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    // connectionTimeoutMS: 10000,
    // sockectTimeoutMS: 45000
    family: 4
};

mongoose.connect(uri, options).then(
    () => {
        Log.i("Database Running");
    },
    err => {
        Log.e(`Error Connecting to database\n${err}`);
    }
);