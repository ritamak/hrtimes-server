const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  section: {
    type: String,
    required: true,
  },
  subsection: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    unique: true,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Article = model("Article", articleSchema);

module.exports = Article;
