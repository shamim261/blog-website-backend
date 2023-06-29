const { check, validationResult } = require("express-validator");

const addBlogValidator = [
  check("title").isLength({ min: 1 }).withMessage("Title cannot e blank"),
  check("description")
    .isLength({ min: 1 })
    .withMessage("Description cannot e blank"),
  check("image").isLength({ min: 1 }).withMessage("image cannot e blank"),
];

const addBlogValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      mappedErrors,
    });
  }
};

// exports
module.exports = { addBlogValidator, addBlogValidatorHandler };
