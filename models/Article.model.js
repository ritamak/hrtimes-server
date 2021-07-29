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
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }],
  likes: [{
      type: Schema.Types.ObjectId,
      ref: "User"
  }],
  dislikes: [{
      type: Schema.Types.ObjectId,
      ref: "User"
  }],
  favorites: [{
      type: Schema.Types.ObjectId,
      ref: "User"
  }],
  image: String,
});

const Article = model("Article", articleSchema);

module.exports = Article;
