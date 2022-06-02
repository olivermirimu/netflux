const fs = require("fs");
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const { getUserById } = require("./utility");

const pathToKey = path.join(__dirname, "./cryptography/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");
const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const initializePassport = (passport) => {
  const authenticateUser = async (payload, done) => {
    const user = await getUserById(payload.sub);
    try {
      user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  };
  passport.use(new JwtStrategy(options, authenticateUser));
  passport.serializeUser((user, done) => (null, user._id));
  passport.deserializeUser(async (id, done) => done(null, getUserById(id)));
};

module.exports = initializePassport;
