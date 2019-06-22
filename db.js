const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/androidRest";

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

mongoose.connect(uri, options);