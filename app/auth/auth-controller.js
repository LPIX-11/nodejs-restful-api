(function () {
    // Authentification Controller

    // Dependencies
    var router = require('express').Router();
    var bodyParser = require('body-parser');

    // JWT Dependencies
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcryptjs');
    var config = require('../../util/constants/config');

    var authValidator = require('./auth-validator');
    var userDal = require('../user/user-dal');
    var utils = require('../../util/helper');
    var result = require('../../util/res');

    // Router
    router.use(bodyParser.urlencoded({
        extended: false
    }));
    router.use(bodyParser.json());

    var User = require('../user/user-model');

    /**
     * Register new user and automatically opens user's session
     * @param {*} req
     * @param {*} res
     */
    exports.register = (req, res) => {
        authValidator.hasSignUpFields(req).then(body => {
            surname = body.surname;
            name = body.name;
            email = body.email;
            username = body.username;
            password = body.password;
            status = body.status;

            return userDal.findOne({ username });
        })
            .then(found => {
                if (found) {
                    return Promise.reject(
                        result.reject('This username is already taken')
                    );
                }

                return userDal.findOne({ email });
            })
            .then(found => {
                if (found) {
                    return Promise.reject(
                        result.reject('This email is already taken')
                    )
                }

                return utils.generateSalt();
            })
            .then(salt => utils.hashPassword(password, salt))
            .then(hashedPassword => userDal.create({
                surname: `${surname}`,
                name: `${name}`,
                email: `${email}`,
                username: `${username}`,
                password: `${hashedPassword}`,
                status: `${status ? status : true}`
            })
            )
            .then(user => utils.jwtSign(user))
            .then(token => {
                result.dataStatus({ _auth: true, _token: token }, 201, res)
            })
            .catch((reject) => result.errorReject(reject, res));
    };

    /**
     * Opens server session for a registered user
     * @param {*} request
     * @param {*} response
     */
    exports.login = (req, res) => {
        let password;
        let user;

        authValidator.hasLoginFields(req).then(body => {
            password = body.password;
            var identification = body.email ? { email: body.email } : { username: body.username };

            return userDal.findOne(identification);
        })
            .then(found => {
                if (!found) {
                    return Promise.reject(
                        result.reject('Invalid user or password.')
                    );
                }

                user = found;
                return utils.comparePassword(password, user.password);
            })
            .then(passwordIsValid => {
                if (!passwordIsValid) {
                    return Promise.reject(
                        result.reject('Invalid user or password.')
                    );
                }

                return utils.jwtSign(user);
            })
            .then(token => result.data({ _auth: true, _token: token }, res))
            .catch(reject => result.errorReject(reject, res));

    };

    /**
     * Returns user according associated to given jwt token
     * @param {*} req
     * @param {*} res
     */
    exports.me = (req, res) => {

        var token = req.headers['x-access-token'];

        utils.isTokenPresent(token, res);

        utils.checkToken(token, config.secret)
            .then(decoded => userDal.findOne({ _id: decoded.id }))
            .then(found => {
                if (!found) {
                    result.rejectStatus('There was problem finding the user.', 500);
                }

                result.data(found, res);
            })
            .catch((reject) => result.errorStatus(reject, 401, res));
    };

    // Update User Informations
    exports.edit = (req, res) => {
        var token = req.headers['x-access-token'];
        utils.isTokenPresent(token, res);

        if (!req.body.email && !req.body.username) {
            result.messageStatus('Unauthorized to edit without email or username.', 401, res);
        }

        utils.checkToken(token, config.secret)
        .then(decoded => userDal.findOne({ _id: decoded.id }))
        .then(found => {
                // var password = req.body.password;

                // if (password) {
                //     utils.generateSalt()
                //         .then(salt => {
                //             return utils.hashPassword(password, salt)
                //         })
                //         .then(hashedPassword => {
                //             req.body.password = hashedPassword;
                            
                //             userDal.updateOne({
                //                 _id: found.id
                //             }, {
                //                 set: req.body
                //             })
                //                 .then(user => {
                //                     return utils.jwtSign(user);
                //                 })
                //                 .then(token => result.data({ _auth: true, _token: token }, res))
                //         })
                // }

                // userDal.updateOne({
                //     _id: found.id
                // }, {
                //     set: req.body
                // })

            })
            // .then(user => {
            //     return utils.jwtSign(user);
            // })
            // .then(token => result.data({ _auth: true, _token: token }, res))
            .catch(reject => result.errorReject(reject, res));


        // jwt.verify(token, config.secret, (err, decoded) => {



        //     User.updateOne({
        //         _id: decoded.id
        //     }, {
        //         set: req.body
        //     }, (err) => {
        //         if (err) {
        //             return res.send(500).send({
        //                 message: 'Could not update user\'s informations'
        //             });
        //         }

        //         token = jwt.sign({
        //             id: decoded.id
        //         }, config.secret, {
        //             expiresIn: 86400 // renew token that will expires in 24 hours
        //         });

        //         res.status(200).send({
        //             token: token
        //         });

        //     });

        // });

    };

}());