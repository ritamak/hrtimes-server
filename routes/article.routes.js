const router = require("express").Router();
const axios = require("axios");
const ArticleModel = require("../models/Article.model");

router.get("/articles", (req, res) => {
  ArticleModel.find()
    .then((articles) => {
      res.status(200).json(articles);
      console.log("get for articles works");
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.get("/article/:id", (req, res) => {
  console.log(req.params);
  ArticleModel.findById(req.params.id)
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

router.post("/create", (req, res, next) => {
  const { section, subsection, title, body, created_date, author } = req.body;
  console.log(req.body);
  ArticleModel.create({
    section: section,
    subsection: subsection,
    title: title,
    body: body,
    created_date: created_date,
    author: author,
  })
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

module.exports = router;
