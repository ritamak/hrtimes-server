const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentBody: String,
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
