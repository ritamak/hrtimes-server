const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

router.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;

  UserModel.findById(id)
    .populate("comments")
    .populate("articles")
    .populate("following")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.post("/users/:id/follow", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  UserModel.findByIdAndUpdate(_id, { $push: { following: id } }, { new: true })
    .populate('following')
    .then((user) => {
      req.session.loggedInUser = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/users/:id/unfollow", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  UserModel.findByIdAndUpdate(_id, { $pull: { following: id } }, { new: true })
    .populate('following')
    .then((user) => {
      req.session.loggedInUser = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
