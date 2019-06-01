# Nodejs - Restful Api
## Overview
![RESTful API design with Node.js](https://cdn-images-1.medium.com/max/2000/1*jjYC9tuf4C3HkHCP5PcKTA.jpeg "RESTful API design with Node.js")
Nodejs Restful API with jwt and mongodb Connection using mongoose

### Set Up Environment
First you need to have an mongodb installation. You can refer here to install an instance:

* ![Install MongoDB on Windows](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514 "MongoDB Windows Installation")
* ![Install MongoDB on Mac OS](https://treehouse.github.io/installation-guides/mac/mongo-mac.html "MongoDB Mac OS Installation")
* ![Install MongoDB on Linux](https://hevodata.com/blog/install-mongodb-on-ubuntu/ "MongoDB Linux Installation")

Then install nodejs
- ![Nodejs Installation](https://nodejs.org/en/download/)

After that you'll have access to npm (Nodejs Package Manager)
```shell
# Install all dependencies
npm install

# For nodejs live reload when file changes in the directory are detected install nodemon
npm install -g nodemon
```

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
