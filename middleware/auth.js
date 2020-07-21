const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
