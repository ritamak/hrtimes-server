const router = require("express").Router();
const ArticleModel = require("../models/Article.model");
const UserModel = require("../models/User.model");

router.get("/articles", (req, res) => {
  ArticleModel.find()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.get("/article/:id", (req, res) => {
  ArticleModel.findById(req.params.id)
    .populate('author')
    .populate('comments')
    .then((response) => {
      console.log(response)
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.post("/create", (req, res, next) => {
  const { section, subsection, title, body, created_date } = req.body;
  ArticleModel.create({
    section: section,
    subsection: subsection,
    title: title,
    body: body,
    created_date: created_date,
    author: req.session.loggedInUser
  }).then((response) => {
    res.status(200).json(response);
    UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {
      $push: { articles: response._id },
    })
      .then(() => {
        console.log("article added to user");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.delete("/article/:id", (req, res) => {
  ArticleModel.findByIdAndDelete(req.params.id)
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

router.patch("/article/:id/edit", (req, res) => {
  let id = req.params.id;
  const { section, subsection, title, body, created_date, author } = req.body;
  ArticleModel.findByIdAndUpdate(
    id,
    { $set: { section, subsection, title, body, created_date, author } },
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
