// Authentification Controller


// Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// JWT Dependencies
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Router
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

var User = require('../user/User');

router.post('/register', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({

            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        },
        function (err, user) {

            if (err) return res.status(500).send("Problem registering the user.");

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

});

// User section
router.get('/me', function (req, res) {

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });

    jwt.verify(token, config.secret, function (err, decoded) {

        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });

        // Send Encoded user

        // res.status(200).send(decoded);

        // Send Full Clear user informations

        /*User.findById(decoded.id, function(err, user) {

        if (err) return res.status(500).send("There was problem finding the user.");

        res.status(200).send(user);

        });*/

        // Send Clear user informations without password

        // to hide field { fieldName: 0 }

        User.findById(decoded.id, {
            password: 0
        }, function (err, user) {

            if (err) return res.status(500).send("There was problem finding the user.");

            res.status(200).send(user);

        });

    });

});

// Login

router.post('/login', function (req, res) {

    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) return res.status(500).send("Error on the server.");
        if (!user) return res.status(404).send("No user found.");
        if (!req.body.password) res.status(500).send("No password entered.");

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            token: null
        });

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

});

// Update User Informations


// Exporting module
module.exports = router;