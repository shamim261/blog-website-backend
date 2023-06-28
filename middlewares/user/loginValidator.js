// internal import
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// external imports

const loginValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("This field cannot be empty")
    .toLowerCase()
    .trim(),
  check("password")
    .isLength({ min: 1 })
    .withMessage("This field cannot be empty")
    .trim(),
];

function loginValidatorHandler(req, res, next) {
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
module.exports = { loginValidator, loginValidatorHandler };
