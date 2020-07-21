var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* GET users listing. */
router.post("/", [
  check("name", "Name required").not().isEmpty().trim().escape(),
  check("email", "Name required").isEmail().trim(),
  ,
  check("password", "Name required").isLength({ min: 6 }),

  async (req, res, next) => {},
]);

module.exports = router;
