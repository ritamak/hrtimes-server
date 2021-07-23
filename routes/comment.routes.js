const router = require("express").Router();
const CommentModel = require("../models/Comment.model");
const UserModel = require("../models/User.model");

router.get("/comments", (req, res) => {
  CommentModel.find()
    .then((comments) => {
      res.status(200).json(comments);
      console.log("get for comments works");
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.get("/comments/:id", (req, res) => {
  CommentModel.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
      console.log(response);
      console.log("Get for comment find by ID works");
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.post("/comments/create", (req, res, next) => {
  const { commentBody, authorId, author } = req.body;
  console.log("this is console for req.body", req.body);
  CommentModel.create({
    commentBody: commentBody,
    authorId: authorId,
    author: author,
  })
    .then((response) => {
      res.status(200).json(response);
      console.log("this is response.data", response.data);
      console.log("this is console for response", response);
      CommentModel.findOne({
        _id: req.body._id,
      })
        .then((comment) => {
          if (!comment) {
            CommentModel.create(req.body).then((newComment) => {
              UserModel.findByIdAndUpdate(req.body.authorId, {
                $push: { comments: response },
              }).then(() => {
                console.log("comment created");
              });
            });
          } else {
            UserModel.findByIdAndUpdate(req.body.authorId).then((user) => {
              if (user.comments.includes(comment._id)) {
                console.log("comment already in the user comments");
              } else {
                UserModel.findByIdAndUpdate(req.body.authorId, {
                  $push: { comments: response },
                }).then(() => {
                  console.log("added comment to user comments");
                });
              }
            });
          }
        })
        .catch((err) => {
          console.log("something failed ", err);
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.delete("/comments/:id", (req, res) => {
  CommentModel.findByIdAndDelete(req.params.id)
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

/*
router.post("/commentToUser"),
  (req, res, next) => {
    CommentModel.findOne({ _id: req.body._id })
      .then((comment) => {
        if (!comment) {
          CommentModel.create(req.body).then((newComment) => {
            UserModel.findByIdAndUpdate(req.body.authorId, {
              $push: { comments: newComment._id },
            }).then(() => {
              console.log("comment created");
            });
          });
        } else {
          UserModel.findByIdAndUpdate(req.body.authorId).then((user) => {
            if (user.comments.includes(comment._id)) {
              console.log("comment already in the user comments");
            } else {
              UserModel.findByIdAndUpdate(req.body.authorId).then(() => {
                console.log("added comment to user comments");
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log("something failed ", err);
      });
  };
*/
module.exports = router;
