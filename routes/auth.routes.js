const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");

router.post("/signup", (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    country,
    city,
    image,
    passwordHash,
    interests,
    comments,
    articles,
  } = req.body;

  if (
    !username ||
    !email ||
    !passwordHash ||
    !firstName ||
    !lastName ||
    !city ||
    !country ||
    !interests
  ) {
    res.status(500).json({
      errorMessage: "Please enter all fields",
    });

    return;
  }

  // const myRegex = new RegExp(
  //   /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  // );

  // if (!myRegex.test(email)) {
  //   res.status(500).json({
  //     errorMessage: "Email format not correct",
  //   });

  //   return;
  // }

  // const myPassRegex = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  // );
  // if (!myPassRegex.test(passwordHash)) {
  //   res.status(500).json({
  //     errorMessage:
  //       "Password needs to have 8 characters, a number and an Uppercase alphabet",
  //   });
  //   return;
  // }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(passwordHash, salt);

  UserModel.create({
    username,
    firstName,
    lastName,
    email,
    country,
    city,
    image,
    passwordHash: hash,
    interests,
    comments,
    articles,
  })
    .then((user) => {
      user.passwordHash = "***";
      req.session.loggedInUser = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(500).json({
          errorMessage: "Username or email entered already exists!",
          message: err,
        });
      } else {
        res.status(500).json({
          errorMessage: "Something went wrong! Go to sleep!",
          message: err,
        });
      }
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(500).json({
      error: "Please enter username. email and password",
    });
    return;
  }

  // const myRegex = new RegExp(
  //   /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  // );
  // if (!myRegex.test(email)) {
  //   res.status(500).json({
  //     error: "Please enter a correct email format",
  //   });
  //   return;
  // }

  UserModel.findOne({ email })
    .then((userData) => {
      bcrypt
        .compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          if (doesItMatch) {
            userData.passwordHash = "***";
            req.session.loggedInUser = userData;
            res.status(200).json(userData);
          } else {
            res.status(500).json({
              error: "Invalid password",
            });
            return;
          }
        })
        .catch(() => {
          res.status(500).json({
            error: "Invalid email",
          });
          return;
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Email does not exist",
        message: err,
      });
      return;
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(204).json({});
});

const isLoggedIn = (req, res, next) => {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

router.get("/profile", isLoggedIn, (req, res, next) => {
  UserModel.findById(req.session.loggedInUser._id)
    .populate("comments")
    .populate("articles")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
