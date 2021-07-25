const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const UserModel = require("../models/User.model");
const ArticleModel = require("../models/Article.model");

router.get("/comments", (req, res) => {
  CommentModel.find()
    .then((comments) => {
      res.status(200).json(comments);
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
    .populate('author')
    .then((response) => {
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

router.post("/article/:id/comments/create", (req, res, next) => {
  const { id } = req.params;
  const { commentBody } = req.body;
  ArticleModel.findById(id)
    .then((article) => {
      CommentModel.create({
        commentBody: commentBody,
        author: req.session.loggedInUser,
        article: article
      })
      .then((comment) => {
        res.status(200).json(comment);
        UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {
          $push: { comments: comment }
        }).then(response => console.log(response)).catch(err => console.log(err))
        ArticleModel.findByIdAndUpdate(id, {
          $push: { comments: comment }
        }).then(response => console.log(response)).catch(err => console.log(err))
      })
      .catch((err) => {
        console.log('Comment create failed!', err);
      })
    })
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
