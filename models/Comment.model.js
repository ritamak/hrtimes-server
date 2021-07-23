const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentBody: String,
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
