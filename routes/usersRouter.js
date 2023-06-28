// Internal Imports
const express = require("express");

// external imports
const { getUsers, addUser } = require("../controller/usersController");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/user/addUserValidator");
const router = express.Router();

// get user
router.get("/api/users", getUsers);

// ADD user
router.post("/", addUserValidator, addUserValidatorHandler, addUser);

module.exports = router;
