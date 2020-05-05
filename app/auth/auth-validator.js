(function () {
    'use strict';

    const Promise = require('bluebird');
    const helper = require('../../util/helper');

    /**
     * Validate if user has all required fields checked when signing up
     * @param {*} request
     */
    exports.hasSignUpFields = req => {
        return new Promise((resolve, reject) => {
            helper.validateEmpty('surname', 'No surname provided', reject, req);
            helper.validateEmpty('name', 'No name provided', reject, req);
            helper.validateEmpty('username', 'No username provided', reject, req);
            helper.validateEmpty('email', 'No email provided', reject, req);
            helper.validateEmpty('password', 'No password provided', reject, req);

            helper.sanitizeTrim(req, ['username', 'email', 'password']);
            resolve(req.body);
        });
    };

    /**
     * Validate if user has all required fields checked when login
     * @param {*} request
     */
    exports.hasLoginFields = req => {
        return new Promise((resolve, reject) => {
            if (req.body.username) {
                helper.validateEmpty('username', 'No username provided', reject, req);
            } else {
                helper.validateEmpty('email', 'No email provided', reject, req);
            }
            
            helper.validateEmptyOnly('password', 'No password provided', reject, req);

            helper.sanitizeTrim(req, ['username', 'password']);
            resolve(req.body);
        });
    };
}());