var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();

const Post = require("../models/Post");

/* GET users listing. */
router.get("/new-post/", function (req, res, next) {
  res.send("new post page");
});

router.post("/new-post/", []);

module.exports = router;
