const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const ArticleModel = require('../models/Article.model');
const CommentModel = require('../models/Comment.model');

router.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  console.log(req.session);

  UserModel.findById(id)
    .populate('comments')
    .populate('articles')
    .populate('following')
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

router.post("/users/:id", (req, res, next) => {
  const { id } = req.params;
  // const { _id } = req.session.loggedInUser;
  console.log(req.session);
//   UserModel.findByIdAndUpdate(_id, {$push: {following: id}})
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
});

module.exports = router;