var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

router.get("/", function (req, res, next) {
  res.send("new user page");
});

/* GET users listing. */
router.post(
  "/",
  [
    check("name", "Name required").not().isEmpty(),
    check("email", "Email required").isEmail().trim(),
    check("password", "Password required").isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, admin } = req.body;

    //validating email in lowercase form
    let lowerCaseEmail = email.toLowerCase();

    try {
      //See if user already exists

      let user = await User.findOne({ email: lowerCaseEmail });
      // return res.send("USER Will be found!");
      //if user exists in database return
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Create a new user
      user = new User({
        name,
        email,
        password,
        admin,
      });

      //Encrypt password with bcrypt
      const salt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(password, salt);

      //Save user to DB
      await user.save();

      //Set up the jwt payload to user ID
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token, msg: "Registration Success!" });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
