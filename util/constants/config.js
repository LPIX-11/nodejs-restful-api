// JWT Secret Key Configuration
require('dotenv').config();
require('./config');

module.exports = {
    'secret': process.env.API_JWT_USER_SECRET
};