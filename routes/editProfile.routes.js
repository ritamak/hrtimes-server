const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");
const ArticleModel = require("../models/Article.model");
const CommentModel = require("../models/Comment.model");

router.patch("/:id/edit", (req, res) => {
  let id = req.params.id;
  let {
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

  if (!image) {
    image = req.session.loggedInUser.image;
  }

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
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  let { id } = req.params;

  ArticleModel.find()
    .populate("author")
    .deleteMany({ author: { _id: id } })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  CommentModel.find()
    .deleteMany({ author: { _id: id } })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  UserModel.findOneAndRemove(id)
    .then((response) => {
      req.session.destroy();
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;
