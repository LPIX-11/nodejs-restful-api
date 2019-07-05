(function () {
    "use strict";
    // Data Access Layer File

    const User = require("./user-model");

    // Create a new user
    exports.create = data => new User(data).save();

    // Update user
    exports.update = (user, data) => {
        Object.assign(user, data);
        return user.save();
    };

    exports.remove = query => User.deleteOne(query).exec();

    // Find user
    exports.findOne = query => User.findOne(query).exec();

    // Select all users
    exports.findAll = query => User.find(query).exec();
}());