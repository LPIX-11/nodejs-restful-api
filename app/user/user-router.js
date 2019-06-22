"use strict";

// Declare router to manage the routing paths
const router = require("express").Router();

// Declare controller to manage user functionnal tasks
const controller = require("./user-controller");

// Get all users' path
router.get("/", controller.findAll);