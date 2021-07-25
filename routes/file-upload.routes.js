const express = require("express");
const router = express.Router();
const uploader = require("../middlewares/cloudinary.config");

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
  console.log("file is: ", req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.status(200).json({ image: req.file.path });
});

module.exports = router;
