var express = require("express");
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname + "/client/public/index.html"));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
