// Internal Imports
const express = require("express");

// external imports
const {
  getUsers,
  addUser,
  loginUser,
} = require("../controller/usersController");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/user/addUserValidator");
const {
  loginValidator,
  loginValidatorHandler,
} = require("../middlewares/user/loginValidator");
const checkLogin = require("../middlewares/common/checkLogin");
const router = express.Router();

// get user
router.get("/", checkLogin, getUsers);

// ADD user
router.post("/signup", addUserValidator, addUserValidatorHandler, addUser);

// login user

router.post("/login", loginValidator, loginValidatorHandler, loginUser);

module.exports = router;
