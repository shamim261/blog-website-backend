const { check, validationResult } = require("express-validator");

const updateBlogValidator = [
  check("title").isLength({ min: 1 }).withMessage("Title cannot e blank"),
  check("description")
    .isLength({ min: 1 })
    .withMessage("Description cannot e blank"),
];

const updateBlogValidatorHandler = function (req, res, next) {
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
module.exports = { updateBlogValidator, updateBlogValidatorHandler };
