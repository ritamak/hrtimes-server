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

// config for deployment
// public we can call whatever the folder name is
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

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

const usersRoutes = require("./routes/users.routes");
app.use("/api", usersRoutes);

const googleRoutes = require("./routes/google.routes");
app.use("api", googleRoutes);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

require("./error-handling")(app);

module.exports = app;
