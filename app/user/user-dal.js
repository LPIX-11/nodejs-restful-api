"use strict";

// Data Access Layer
const User = require("./user-model");

// Create a new user
exports.create = data => new User(data).save();

// Update user
exports.update = (user, data) => {
    Object.assign(user, data);
    return user.save();
};

// Find user
exports.findOne = query => User.findOne(query).exec();

// Select all users
exports.findAll = query => User.find(query).exec();