(function () {
    'use strict';

    const Promise = require('bluebird');
    const bcrypt = require('bcryptjs');

    const jwt = require('jsonwebtoken');
    const config = require('../util/constants/config');
    const result = require('./res');

    const WORK_FACTOR = process.env.SALT_WORK_FACTOR;

    /**
     * Checks if a field is present or empty
     * @param {*} attr 
     * @param {*} message 
     * @param {*} reject 
     * @param {*} req 
     * @param {*} trim 
     */
    const validate = (attr, message, reject, req, trim = true) => {
        if (trim) {
            req.checkBody(attr, message).trim().notEmpty();
        } else {
            req.checkBody(attr, message).notEmpty();
        }

        const errors = req.validationErrors();
        if (errors) {
            reject(result.reject(errors));
        }
    };

    /**
     * Checks if a field is present and filled without space
     * @param {*} attr 
     * @param {*} message 
     * @param {*} reject 
     * @param {*} req 
     * @param {*} trim 
     */
    exports.validateEmpty = (attr, message, reject, req) => {
        validate(attr, message, reject, req);
    };

    /**
     * Checks if a field is present and filled
     * It doesn't remove spaces
     * @param {*} attr 
     * @param {*} message 
     * @param {*} reject 
     * @param {*} req 
     * @param {*} trim 
     */
    exports.validateEmptyOnly = (attr, message, reject, req) => {
        validate(attr, message, reject, req, false);
    };

    /**
     * Generates salt according to defined salt factor
     */
    exports.generateSalt = () => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(parseInt(WORK_FACTOR), (err, salt) => {
                if (!err) {
                    resolve(salt);
                }
                reject(result.reject(`Salt Generation failed: ${err}`));
            });
        });
    };

    /**
     * Checks if a password contains valid formats
     * And resolves a valid password
     * @param {String} password
     * @param {Int} salt
     */
    exports.hashPassword = (password, salt) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (!err) {
                    resolve(hash);
                }
                reject(result.reject(`Password hashing failed ${err}`));
            });
        });
    };

    /**
     * Authentifies user and creates a JWT token
     * @param {User} user
     */
    exports.jwtSign = user => {
        let data = {
            id: user._id,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        let token = jwt.sign(data, config.secret, {
            expiresIn: 300  // 86400 expires in 24 hours
        });

        return new Promise.resolve(token);
    }

    /**
     * Checks if the X-CSRF token is present
     * @param {String} token
     * @param {*} response
     */
    exports.isTokenPresent = (token, res) => {
        if (!token) {
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        }
    };

    /**
     * Call this function inside jwt check
     * It tests if the token is valid
     * @param {*} error
     * @param {*} response
     */
    exports.checkToken = (token, secret) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (!err) {
                    resolve(decoded)
                }
                
                reject (
                    result.reject('Failed to authenticate token.')
                )
            })
        });
    };

    /**
     * Cleans all input fiields
     * @param {*} request
     * @param {Array} values
     */
    exports.sanitizeTrim = (req, values) => {
        for (let i = 0; i < values.length; i++) {
            req.sanitize(values[i]).trim();
        }
    };

    /**
     * Compares the given password with the user's actual password
     * @param {String} givenPassword
     * @param {String} userPassword
     */
    exports.comparePassword = (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, valid) => {
                if (!err) {
                    resolve(valid);
                }
                reject(result.reject(`Password comparison failed: ${err}`));
            });
        });
    };
    
}());