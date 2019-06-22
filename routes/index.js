"use stric";

const router = require("express").Router();
const result = require("../util/response");

router.get("/", (req, res) => {
    const data = {
        author: process.env.AUTHOR,
        version: process.env.VERSION,
        port: process.env.PORT,
        env: process.env.NODE_ENV,
        base_url: process.env.BASE_URL + '/' + process.env.VERSION,
        status: "running"
    };
    result.data(data, res);
});

// Call on users route
router.use("/users", require("../app/user/user-router"));

module.exports = router;