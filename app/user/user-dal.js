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

    // Find user
    exports.findOne = query => User.findOne(query).exec();

    // Select all users
    exports.findAll = query => User.find(query).exec();

    // Update user
    exports.updateOne = query => User.updateOne(query).exec();

    // Activate this function if you want to be able to remove users
    // exports.remove = query => User.deleteOne(query).exec();
}());