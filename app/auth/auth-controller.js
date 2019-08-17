(function () {
    // Authentification Controller

    // Dependencies
    var router = require("express").Router();
    var bodyParser = require("body-parser");

    // JWT Dependencies
    var jwt = require("jsonwebtoken");
    var bcrypt = require("bcryptjs");
    var config = require("../../util/constants/config");

    // Router
    router.use(bodyParser.urlencoded({
        extended: false
    }));
    router.use(bodyParser.json());

    var User = require("../user/user-model");

    // Register new user
    exports.register = (req, res) => {

        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({

                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                surname: req.body.surname,
                password: hashedPassword,
                status: req.status
            },
            function (err, user) {

                if (err) {
                    return res.status(500).send(`${err} Problem registering the user.`);
                }

                // Creating token
                var token = jwt.sign({
                    id: user._id
                }, config.secret, {
                    expiresIn: 86400 // 24H
                });

                res.status(200).send({
                    auth: true,
                    token: token
                });

            });

    };

    // Sign User In
    exports.login = (req, res) => {

        User.findOne({
            email: req.body.email
        }, function (err, user) {

            if (err) {
                return res.status(500).send("Error on the server.");
            }

            if (!user) {
                return res.status(404).send("No user found.");
            }

            if (!req.body.password) {
                res.status(500).send("No password entered.");
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    token: null
                });
            }

            var token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({
                auth: true,
                token: token
            });

        });

    };

    // Go To User Profile Section
    exports.me = (req, res) => {

        var token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).send({
                auth: false,
                message: "No token provided."
            });
        }

        jwt.verify(token, config.secret, function (err, decoded) {

            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token."
                });
            }

            // Send Full Clear user informations

            /*User.findById(decoded.id, function(err, user) {

            if (err) {
                return res.status(500).send("There was problem finding the user.");
            }

            res.status(200).send(user);

            });*/

            // Send Clear user informations without password

            // to hide field { fieldName: 0 }

            User.findById(decoded.id, {
                password: 0
            }, function (err, user) {

                if (err) {
                    return res.status(500).send("There was problem finding the user.");
                }

                res.status(200).send(user);

            });

        });

    };

    // Update User Informations
    exports.edit = (req, res) => {
        var token = req.headers["x-access-token"];

        jwt.verify(token, config.secret, function (err, decoded) {
            if (!token) {
                return res.status(401).send({
                    auth: false,
                    message: "No token provided."
                });
            }

            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token."
                });
            }

            if (!req.body.email) {
                return res.status(401).send({
                    message: "Unauthorized to edit without email"
                });
            }

            if (req.body.password) {
                var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                req.body.password = hashedPassword;
            }

            User.updateOne({
                _id: decoded.id
            }, {
                set: req.body
            }, function (err) {
                if (err) {
                    return res.send(500).send({
                        message: "Could not update user's informations"
                    });
                }

                token = jwt.sign({
                    id: decoded.id
                }, config.secret, {
                    expiresIn: 86400 // renew token that will expires in 24 hours
                });

                res.status(200).send({
                    token: token
                });

            });

        });

    };

}());