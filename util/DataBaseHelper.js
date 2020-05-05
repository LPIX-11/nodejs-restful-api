require('dotenv').config();
require('./constants/config');

const mongoose = require('mongoose');
const mongoUri = process.env.DATABASE_URL;

const Log = require('./log');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    family: 4
};

mongoose.connect(mongoUri, options).then(
    () => {
        Log.i('Database Running');
    },
    err => {
        Log.e(`Error Connecting to database\n${err}`);
    }
);