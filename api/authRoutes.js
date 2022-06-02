const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const passport = require("passport");
const { getUserByEmail } = require("./utility");
const User = require("./models/userModel");

const pathToKey = path.join(__dirname, "./cryptography/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

const issueJwt = (id) => {
  const expiresIn = "2d";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: "RS256",
  });
  return { token: `Bearer ${signedToken}`, expires: expiresIn };
};

const authRoutes = () => {
  const authRouter = express.Router();

  authRouter.route("/login").post(async (req, res) => {
    const _user = await getUserByEmail(req.body.email);
    if (!_user) return res.json({ message: "Invalid Email" });
    try {
      if (await bcrypt.compare(req.body.password, _user.password)) {
        const jwtToken = issueJwt(_user._id);
        const returnUser = _user.toJSON();
        delete returnUser.password;
        delete returnUser.__v;
        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        return res.header("Authorization", jwtToken.token).json(returnUser);
      }
      
      return res.json({ message: "Authentication Error, please try again" });
    } catch (err) {
      return res.json({
        message: "Authentication Error, please try again",
        error: err,
      });
    }
  });
  authRouter.route("/register").post(async (req, res) => {
    try {
      const userExists = await getUserByEmail(req.body.email);
      if (userExists) return res.json({ message: "Email Already In Use" });
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({ ...req.body, password: hashedPassword });
      user.save().catch((err) =>
        res.json({
          message: "An error occured during registraion please try again",
          error: err,
        })
      );
      const jwtToken = issueJwt(user._id);
      const returnUser = user.toJSON();
      delete returnUser.password;
      delete returnUser.__v;
      res.setHeader("Access-Control-Expose-Headers", "Authorization");
      return res.header("Authorization", jwtToken.token).json(returnUser);
    } catch (err) {
      return res.json({
        message: "Registration error, please try again",
        error: err,
      });
    }
  });

  authRouter.route("/logout").delete((req, res) => {
    req.logOut();
    return res.json({ message: "Succesfully logged out" });
  });
  authRouter
    .route("/current-user")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      const returnUser = req.user.toJSON();
      delete returnUser.password;
      delete returnUser.__v;

      return res.status(201).json(returnUser);
    });
  return authRouter;
};

module.exports = authRoutes;
