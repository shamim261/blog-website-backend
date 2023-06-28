// internal imports
const bcrypt = require("bcrypt");
// external imports
const User = require("../models/People");

// get users

async function getUsers(req, res, next) {
  try {
    let users = await User.find({}, { _id: 0, __v: 0 });

    if (users) {
      res.status(200).json({
        users,
      });
    } else {
      res.status(500).json({
        msg: "User bot found",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Server Problem",
    });
  }
}

//  add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  newUser = new User({
    ...req.body,
    password: hashedPassword,
  });
  try {
    const result = await newUser.save();
    res.status(200).json({
      msg: "User added successfully",
    });
  } catch (e) {
    res.status(500).json({
      msg: e.msg,
    });
  }
}

// exports
module.exports = { getUsers, addUser };
