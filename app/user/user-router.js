"use strict";

// Declare router to manage the routing paths
const router = require("express").Router();

// Declare controller to manage user functionnal tasks
const controller = require("./user-controller");

// Get all users' path
router.get("/", controller.findAll);

// Retrieve specified user
router.param("id", controller.validateOne);
router.get("/:id", controller.findOne);

// Delete the specified user
router.param("id", controller.validateRemoval);
router.delete("/:id", controller.remove);
// router.patch("/:id", controller.changeStatus);

module.exports = router;