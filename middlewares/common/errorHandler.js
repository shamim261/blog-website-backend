const createError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createError("This content were not found!"));
}

function errorHandler(err, req, res, next) {
  res.status(err.status).json({
    err,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
