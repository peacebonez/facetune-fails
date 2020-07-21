var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");

router.get("/new-post", function (req, res, next) {
  res.send("new post page");
});

// router.post("/new-post/", []);

module.exports = router;
