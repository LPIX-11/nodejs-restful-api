const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const userDal = require("./user-dal");
const result = require("../../util/response");

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

// Create a new user [Route: /api/auth/register]
// router.post("/", function (req, res) {
//     User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         },
//         function (err, user) {
//             if (err) {
//                 return res.status(500).send("There was a problem adding the information to the database.");
//             }
//             res.status(200).send(user);
//         });
// });

// Returns all users in the database [Route: /users]
exports.findAll = (req, res) => {
    return userDal.findAll()
        .then(users => {
            result.data(users, res);
        });
    // User.find({}, function (err, users) {
    //     if (err) {
    //         return res.status(500).send("There was a problem finding the users.");
    //     }
    //     res.status(200).send(users);
    // });
};

// // Return the specified user [Route: /users/:id]
// router.get("/:id", function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) {
//             return res.status(500).send("There was a problem finding the user.");
//         }

//         if (!user) {
//             return res.status(404).send("No user found.");
//         }

//         res.status(200).send(user);
//     });
// });

// // Deletes the specified user [Route: /users/:id]
// router.delete("/:id", function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) {
//             return res.status(500).send("There was a problem deleting the user.");
//         }
//         res.status(200).send(`User: ${user.name} was deleted.`);
//     });
// });

// // Updates the specified user [Route: /users/:id]
// router.put("/:id", function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     }, function (err, user) {
//         if (err) {
//             return res.status(500).send("There was a problem updating the user.");
//         }
//         res.status(200).send(user);
//     });
// });