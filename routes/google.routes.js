const router = require("express").Router();
const UserModel = require("../models/User.model");

router.post("/google/info", (req, res, next) => {
  const { username, firstName, lastName, email, image, googleId } = req.body;
  console.log("getting to google info");
  try {
    UserModel.find({ email: email })
      .then((result) => {
        if (result.length == 0) {
          UserModel.create({
            username: firstName,
            firstName,
            lastName,
            googleId,
            image,
            email,
          }).then((response) => {
            req.session.loggedInUser = response;
            console.log(response);
            res.status(200).json({ data: response });
          });
        } else {
          req.session.loggedInUser = result[0];
          res.status(200).json({ data: result[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

module.exports = router;
