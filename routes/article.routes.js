const router = require("express").Router();
const axios = require("axios");
const ArticleModel = require("../models/Article.model");

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

router.get('/article/:id', (req, res) => {
  ArticleModel.findById(req.params.id)
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    }) 
})

router.patch('/article/:id/edit', (req, res) => {
  let id = req.params.id
  const {name, description, completed, image} = req.body;
  TodoModel.findByIdAndUpdate(id, {$set: {name: name, description: description, completed: completed, image: image}}, {new: true})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    }) 
})

module.exports = router;
