const User = require("./models/userModel");
const getUserByEmail = async (email) => {
  let _user;
  await User.findOne({ email }, (err, user) => {
    if (err) return console.log(err);
    _user = user;
  });
  return _user;
};

const getUserById = async (_id) => {
  let _user;
  await User.findById(_id, (err, user) => {
    if (err) return console.log(err);
    _user = user;
  });
  return _user;
};

module.exports = { getUserByEmail, getUserById };
