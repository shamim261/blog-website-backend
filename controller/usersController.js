// internal imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

// login user

async function loginUser(req, res, next) {
  try {
    let user = await User.findOne({
      $or: [{ email: req.body.username }, { username: req.body.username }],
    });

    if (user && user._id) {
      let isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // make the userObject for jwt
        const userObject = {
          username: user.username,
          email: user.email,
        };
        // generate JWT token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.status(200).json({
          msg: "Logged in successfully",
        });
      } else {
        res.status(500).json({
          msg: "login failed!",
        });
      }
    } else {
      res.status(500).json({
        msg: "login failed!",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
}

// exports
module.exports = { getUsers, addUser, loginUser };
