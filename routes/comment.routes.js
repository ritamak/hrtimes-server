const router = require("express").Router();
const CommentModel = require("../models/Comment.model");

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
      console.log(response);
      console.log("Get for comment find by ID works");
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.post("/comments/create", (req, res, next) => {
  const { commentBody } = req.body;
  console.log(req.body);
  CommentModel.create({
    commentBody: commentBody,
  })
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

router.delete("/comments/:id", (req, res) => {
  CommentModel.findByIdAndDelete(req.params.id)
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

module.exports = router;
