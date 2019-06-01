# Nodejs - Restful Api
## Overview
![RESTful API design with Node.js](https://cdn-images-1.medium.com/max/2000/1*jjYC9tuf4C3HkHCP5PcKTA.jpeg "RESTful API design with Node.js")
Nodejs Restful API with jwt and mongodb Connection using mongoose
First you need to have an mongodb installation. You can refer here to install an instance:
__
![Install MongoDB on Windows](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514 "MongoDB Windows Installation")

![Install MongoDB on Mac OS](https://treehouse.github.io/installation-guides/mac/mongo-mac.html "MongoDB Mac OS Installation")

![Install MongoDB on Linux](https://hevodata.com/blog/install-mongodb-on-ubuntu/ "MongoDB Linux Installation")
__

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
