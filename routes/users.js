var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

/* GET users listing. */
router.post("/", [
  check("name", "Name required").not().isEmpty().trim().escape(),
  check("email", "Name required").isEmail().trim(),
  ,
  check("password", "Name required").isLength({ min: 6 }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user already exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
      });
    } catch (err) {}
  },
]);

module.exports = router;
