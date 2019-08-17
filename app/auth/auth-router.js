(function () {
    "use strict";

    // Declare router to manage the routing paths
    const router = require("express").Router();

    // Declare controller to manage atuthetification tasks
    const controller = require("./auth-controller");

    // Sign user up
    router.post("/register", controller.register);

    // Sign user in
    router.post("/login", controller.login);

    // Retrive user profile
    router.get('/me', controller.me);

    // Update user information
    router.patch('/edit', controller.edit);

    module.exports = router;
}());