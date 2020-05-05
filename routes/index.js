(function () {
    'use strict';

    const router = require('express').Router();
    const result = require('../util/res');

    router.get('/', (req, res) => {
        const data = {
            author: process.env.AUTHOR,
            version: process.env.VERSION,
            port: process.env.PORT,
            env: process.env.NODE_ENV,
            baseUrl: `${process.env.BASE_URL}/${process.env.NODE_ENV}/${process.env.VERSION}`,
            status: 'running'
        };
        result.data(data, res);
    });

    // Call to authentification route
    router.use('/auth', require('../app/auth/auth-router'));

    // Call on users route
    router.use('/user', require('../app/user/user-router'));

    module.exports = router;
}());