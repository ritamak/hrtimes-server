const express = require("express");
const router = express.Router();
const ArticleModel = require("../models/Article.model");

router.post("/article/:id/incLike", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  ArticleModel.findByIdAndUpdate(id, { $push: { likes: _id } }, { new: true })
    .then(() => {
      ArticleModel.findByIdAndUpdate(id, { $pull: { dislikes: _id } }, { new: true })
        .then((article) => {
          res.status(200).json(article);
        })
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/article/:id/decLike", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  ArticleModel.findByIdAndUpdate(id, { $pull: { likes: _id } }, { new: true })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/article/:id/incDislike", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  ArticleModel.findByIdAndUpdate(id, { $push: { dislikes: _id } }, { new: true })
    .then(() => {
      ArticleModel.findByIdAndUpdate(id, { $pull: { likes: _id } }, { new: true })
        .then((article) => {
          res.status(200).json(article);
        })
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/article/:id/decDislike", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  ArticleModel.findByIdAndUpdate(id, { $pull: { dislikes: _id } }, { new: true })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/article/:id/fav", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  ArticleModel.findByIdAndUpdate(id, { $push: { favorites: _id } }, { new: true })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/article/:id/unfav", (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.loggedInUser;
  ArticleModel.findByIdAndUpdate(id, { $pull: { favorites: _id } }, { new: true })
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;