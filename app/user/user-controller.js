(function () {
    'use strict';

    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');

    const userDal = require('./user-dal');
    const result = require('../../util/res');

    const User = require('./user-model');

    router.use(bodyParser.json());

    // Returns all users in the database [Route: /users]
    exports.findAll = (req, res) => {
        return userDal.findAll()
            .then(users => {
                result.data(users, res);
            });
    };

    // Return the specified user [Route: /users/:id]
    exports.validateOne = (req, res, next, id) => {
        return userDal.findOne({
                _id: id
            })
            .then(user => {
                if (!user) {
                    result.errorStatus(`User ${id} doesn't exist`, 404, res);
                } else {
                    req.user = user;
                    next();
                }
            });
    };

    exports.findOne = (req, res) => {
        result.data(req.user, res);
    };

    // Deletes the specified user [Route: /users/:id]
    exports.validateUserUpdate = (req, res, next, id) => {
        return userDal.update(req.user, {
            status: req.user.status
        }).then(user => {
            if (!user) {
                result.errorStatus(`User ${id} doesn't exist`, 404, res);
            } else {
                next();
            }
        });
    };

    exports.update = (req, res) => {
        result.data(req.user, res);
    };

    // Deletes the specified user [Route: /users/:id]
    exports.validatStatusUpdate = (req, res, next, id) => {
        return userDal.updateOne(req.user, {
            status: req.user.status
        }).then(user => {
            if (!user) {
                result.errorStatus(`User ${id} doesn't exist`, 404, res);
            } else {
                next();
            }
        });
    };

    exports.updateOne = (req, res) => {
        result.data(req.user, res);
    };

    exports.validateRemoval = (res, req, next, id) => {
        return userDal.remove({
            _id: id
        }).then(user => {
            if (!user) {
                result.errorStatus(`User ${id} doesn't exist`, 404, res);
            } else {
                req.user = user;
                next();
            }
        });
    };

    exports.remove = (req, res) => {
        result.data(req, res);
    };

    // Updates the specified user [Route: /users/:id]
    router.put('/:id', function (req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, function (err, user) {
            if (err) {
                return res.status(500).send('There was a problem updating the user.');
            }
            res.status(200).send(user);
        });
    });
}());