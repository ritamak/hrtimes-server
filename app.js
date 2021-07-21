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

require("./error-handling")(app);

module.exports = app;

// This is for testing purposes!!!