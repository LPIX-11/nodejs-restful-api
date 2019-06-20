# Nodejs - Restful Api

## Overview

![RESTful API design with Node.js](https://cdn-images-1.medium.com/max/2000/1*jjYC9tuf4C3HkHCP5PcKTA.jpeg "RESTful API design with Node.js")
Nodejs Restful API with jwt and mongodb Connection using mongoose.

### Set Up Environment

First you need to have a mongodb installation. You can refer here to install an instance:

> [Install MongoDB on Windows](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514)
> [Install MongoDB on Mac OS](https://treehouse.github.io/installation-guides/mac/mongo-mac.html "MongoDB Mac OS Installation")
> [Install MongoDB on Linux](https://hevodata.com/blog/install-mongodb-on-ubuntu/ "MongoDB Linux Installation")

Then install nodejs

> [Nodejs Installation](https://nodejs.org/en/download/)

After that you'll have access to npm (Nodejs Package Manager).
Now you can install additionnal dependencies

```shell
# Go inside the project
cd nodejs-restful-api

# Install all dependencies
npm install

# For nodejs live reload when file changes in the directory are detected install nodemon
npm install -g nodemon

# You start the api by hitting
nodemon
# Or
node server.js
```

### Structure

    Routes
        { get; }
        * Retrieve Informations about users
        - /users
        - /users/:id

        * Register informations or Login
        { post; }
        - /auth/register
        - /auth/login

        * Go to user profile
        { get; }
        - /auth/me
        
        * Edit user's informations
        { patch; }
        - /auth/edit

#### Models

    User
        -_id [Generated]
        - name
        - surname
        - email
        - password
        * profile

##### Usefull Tips

> [A guide for adding JWT token-based authentication](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)
> [Understanding JWT in Nodejs](https://www.sitepoint.com/using-json-web-tokens-node-js/)
