(function () {
    "use strict";

    const Promise = require("bluebird");
    const helper = require("../../util/helper");

    // Validate if user has all required fields checked when signing up
    exports.hasSignUpFields = req => {
        return new Promise((resolve, reject) => {
            helper.validateEmpty("username", "No username provided", reject, req);
            helper.validateEmpty("email", "No email provided", reject, req);
            helper.validateEmpty("password", "No password provided", reject, req);

            helper.sanitizeTrim(req, ["username", "email", "password"]);
            resolve(req.body);
        });
    };

    // Validate if user has all required fields checked when login
    exports.hasLoginFields = req => {
        return new Promise((resolve, reject) => {
            helper.validateEmpty("username", "No username provided", reject, req);
            helper.validate("password", "No email provided", reject, req);

            helper.sanitizeTrim(req, ["username", "password"]);
            resolve(req.body);
        });
    };
}());