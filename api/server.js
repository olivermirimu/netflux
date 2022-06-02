/*jslint es6 */
const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("server");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

const Movie = require("./models/movieModel");
const User = require("./models/userModel");
// const MONGODB_URI = "mongodb+srv://Nico:niconetflux@netflux.pwqcz.mongodb.net/netflux?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb://localhost/movieApi";
const db = mongoose.connect(
  MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  (err) => {
    err
      ? console.log(`there is a prolem`, err.message)
      : console.log(`Your connection is ready`);
  }
);
mongoose.connection;

const app = express();
const port = process.env.PORT || 3500;
const apiRouter = require("./routes")(Movie, User);
const initializePassport = require("./passport-config");
const authRoutes = require("./authRoutes")();

app.use(morgan("tiny"));
app.use(passport.initialize());
initializePassport(passport);
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//routing ->routes.js
app.use("/auth", authRoutes);
app.use("/api", apiRouter);

app.get("/", function (req, res) {
  res.send("Welcome to my API");
});

app.listen(port, function () {
  debug(`Listening on port ${chalk.green(port)}`);
});
