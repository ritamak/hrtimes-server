const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const UserModel = require("../models/User.model");

router.get("/comments", (req, res) => {
  CommentModel.find()
    .then((comments) => {
      res.status(200).json(comments);
      console.log("get for comments works");
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.get("/comments/:id", (req, res) => {
  CommentModel.findById(req.params.id)
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

router.post("/comments/create", (req, res, next) => {
  const { commentBody, authorId, author } = req.body;
  CommentModel.create({
    commentBody: commentBody,
    authorId: authorId,
    author: author,
  }).then((response) => {
    res.status(200).json(response);
    UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {
      comments: response._id,
    })
      .then(() => {
        console.log("comment added to user");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.delete("/comments/:id", (req, res) => {
  CommentModel.findByIdAndDelete(req.params.id)
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

module.exports = router;
