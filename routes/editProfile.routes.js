const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");

router.get("/:id/edit", (req, res) => {
<<<<<<< HEAD
  UserModel.findById(req.params.todoId)
=======
  console.log(req.params);

  UserModel.findById(req.params.id)
>>>>>>> 03f2ae3f4838a6e55e0ddfb2306a1b08b767089f
    .then((response) => {
      console.log("router get for edit profile working");
      res.status(200).json(response);
      console.log(response);
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

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(passwordHash, salt);

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
        passwordHash: hash,
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
