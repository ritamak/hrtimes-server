const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const UserModel = require("../models/User.model");
const ArticleModel = require("../models/Article.model");

router.get("/comments", (req, res) => {
  UserModel.findById(req.session.loggedInUser._id)
    .populate("comments")
    .then((user) => {
      res.status(200).json(user.comments);
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
    .populate("author")
    .populate("article")
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.log("Comments not found!", err);
    });
});

router.post("/article/:id/comments/create", (req, res, next) => {
  const { id } = req.params;
  const { commentBody } = req.body;
  ArticleModel.findById(id).then(() => {
    CommentModel.create({
      commentBody: commentBody,
      author: req.session.loggedInUser._id,
      article: id,
    })
      .then(async (comment) => {
        await UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {
          $push: { comments: comment._id },
        });
        await ArticleModel.findByIdAndUpdate(id, {
          $push: { comments: comment._id },
        });
        res.status(200).json(comment);
      })
      .catch((err) => {
        console.log("Comment create failed!", err);
      });
  });
});

router.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;

  CommentModel.findById(id)
    .then(() => {
      let myPromises = [];
      myPromises.push(
        ArticleModel.findOneAndUpdate(
          { comments: { $in: [id] } },
          { $pull: { comments: id } }
        )
      );
      myPromises.push(
        UserModel.findByIdAndUpdate(_id, { $pull: { comments: id } })
      );
      myPromises.push(CommentModel.findByIdAndDelete(id));
      Promise.all(myPromises)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json({
            error: "Something went wrong",
            message: err,
          });
        });
    })
    .catch((err) => {});
});

module.exports = router;
