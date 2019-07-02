"use strict";

const Promise = require("bluebird");
const bcrypt = require("bcryptjs");

// Change respose to res {response || result } depending on situation
const result = require("../util/response");

// Validate empty fields
exports.validateEmpty = (attr, message, reject, req) => {
    validate(attr, message, reject, req);
};

// Validate only empty fields
exports.validateEmptyOnly = (attr, message, reject, req) => {
    validate(attr, message, reject, req, false);
};


// Fields validator
const validate = (attr, message, reject, req, trim = true) => {
    if (trim) {
        req.checkBody(attr, message).trim().notEmpty();
    } else {
        req.checkBody(attr, message).trim().notEmpty();
    }

    const errors = req.validationErrors();
    if (errors) reject(result.reject(errors[0]).msg);
};

// hash password
exports.hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, null, (err, valid) => {
            if (err) {
                reject(result.reject(`Password rejected ${err}`))
            } else {
                resolve(valid);
            }
        });
    });
};

// Snitize input by cleaning it
exports.sanitizeTrim = (req, values) => {
    for (let i = 0; i < values.length; i++) {
        req.sanitize(values[i]).trim();
    }
};