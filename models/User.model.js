const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image: String,
  passwordHash: {
    type: String,
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const User = model("User", userSchema);

module.exports = User;
