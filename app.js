require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
require("./config")(app);
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "hrtimes",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/rhtimes",
      ttl: 60 * 60 * 24,
    }),
  })
);

const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const fetchRoutes = require("./routes/news.routes");
app.use("/api", fetchRoutes);

const profileRoutes = require("./routes/editProfile.routes");
app.use("/api", profileRoutes);

const articleRoutes = require("./routes/article.routes");
app.use("/api", articleRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/api", commentRoutes);

const fileUploadRoutes = require("./routes/file-upload.routes");
app.use("/api", fileUploadRoutes);

require("./error-handling")(app);

module.exports = app;
