// internal imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// external imports
const User = require("../../models/People");

const addUserValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("username is required")
    .isAlpha("en-US", { ignore: " 0123456789" })
    .toLowerCase()
    .trim()
    .custom(async (value) => {
      try {
        let user = await User.findOne({ username: value });
        if (user) {
          throw createError("Username already exist!");
        }
      } catch (e) {
        throw createError(e.message);
      }
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Please enter minimum 8 characther long password!"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .toLowerCase()
    .trim()
    .custom(async (value) => {
      try {
        let user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already exist!");
        }
      } catch (e) {
        throw createError(e.message);
      }
    }),
];

function addUserValidatorHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
}

module.exports = { addUserValidator, addUserValidatorHandler };
