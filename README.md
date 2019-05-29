# Nodejs - Restful Api
## Overview
![RESTful API design with Node.js](https://cdn-images-1.medium.com/max/2000/1*jjYC9tuf4C3HkHCP5PcKTA.jpeg "RESTful API design with Node.js")
Nodejs Restful API with jwt and mongodb Connection using mongoose

--
use npm install to install dependencies
--

### Structure
    Routes
        { get; }
        * Retrieve Informations about users
        - /users
        - /users/:id
        * Register informations or Login
        { post; }
        - /api/auth/register
        - /api/auth/login
        - /api/auth/me

#### Models
    User
        -_id [Generated]
        - Full_name
        - email
        - password
        * profile
