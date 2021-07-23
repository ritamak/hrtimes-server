const express = require("express");
const router = express.Router();
//const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");

router.get("/:id/edit", (req, res) => {
  UserModel.findById(req.params.todoId)
    .then((response) => {
      console.log("router get for edit profile working");
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.patch("/:id/edit", (req, res) => {
  let id = req.params.id;
  const {
    username,
    firstName,
    lastName,
    email,
    country,
    city,
    image,
    passwordHash,
    interests,
  } = req.body;
  UserModel.findByIdAndUpdate(
    id,
    {
      $set: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        city: city,
        image: image,
        passwordHash: passwordHash,
        interests: interests,
      },
    },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;
