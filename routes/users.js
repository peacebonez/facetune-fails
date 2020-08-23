var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const config = require("config");

router.get("/", (req, res) => res.send("new user page"));

/* GET users listing. */
router.post(
  "/",
  [
    check("name", "Name required").not().isEmpty(),
    check("email", "Email required").isEmail().trim(),
    check("password", "Password required").isLength({ min: 6 }),
  ],
  async (req, res) => {
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
        config.get("jwtSecret"),
        { expiresIn: 900 },
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

router.put(
  "/profile",
  [check("password", "Password required").notEmpty().isLength({ min: 6 })],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("req.body:", req.body);
    console.log("req.user:", req.user);

    const { name, password, newPassword, newPassword2 } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ msg: "No user found!" });
      }

      console.log("user:", user);

      //compares the request password with the user in DB password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Do we have a password match:", isMatch);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //if user enters name change their user name
      if (name) user.name = name;

      console.log("user.name:", user.name);

      //changing password
      if (newPassword && newPassword2) {
        if (newPassword !== newPassword2) {
          return res.status(400).json({ msg: "New passwords do not match" });
        }

        if (newPassword.length < 6 || newPassword2.length < 6)
          return res
            .status(400)
            .json({ msg: "Passwords must be 6 characters or longer" });

        if (password === newPassword) {
          return res.status(400).json({
            msg: "Cannot change password to password currently in use.",
          });
        }
        //Encrypt new password with bcrypt
        const salt = await bcrypt.genSalt();

        user.password = await bcrypt.hash(newPassword, salt);
      }

      await user.save();

      res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error @ Edit Profile");
    }
  }
);

module.exports = router;
