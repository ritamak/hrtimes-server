const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentBody: String,
  authorId: String,
  author: String,
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
