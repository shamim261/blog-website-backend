const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    const token = cookies[process.env.COOKIE_NAME];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } else {
    res.status(401).json({
      msg: "Auth Failed!",
    });
  }
}

module.exports = checkLogin;
