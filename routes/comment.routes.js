const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const UserModel = require("../models/User.model");
const ArticleModel = require("../models/Article.model");

router.get("/comments", (req, res) => {
  CommentModel.find()
    .populate('author')
    .populate('article')
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
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.get("/article/:id/comments", (req, res, next) => {
  const { id } = req.params;
  CommentModel.find({ article: { _id: id } })
    .populate('article')
    .populate('author')
    .then((comments) => {
      res.status(200).json(comments);
    }).catch((err) => {
      console.log('Comments not found!', err)
    });
});

router.post("/article/:id/comments/create", (req, res, next) => {
  const { id } = req.params;
  const { commentBody } = req.body;
  ArticleModel.findById(id)
    .then((article) => {
      CommentModel.create({
        commentBody: commentBody,
      })
        .then(async (comment) => {
        console.log(comment)
        await  UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {
          $push: { comments: comment._id }
        })
        await ArticleModel.findByIdAndUpdate(id, {
          $push: { comments: comment._id }
        })
        res.status(200).json(comment);
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
