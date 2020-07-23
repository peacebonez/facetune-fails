var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Post = require("../models/Post");
const User = require("../models/User");

//@route: GET /posts
//@desc: retrieve all posts
//@access: Public

router.get("/", async function (req, res, next) {
  try {
    const posts = await Post.find().limit(10);

    if (posts.length < 1) {
      return res.status(400).json({ msg: "No posts found" });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error at GET posts");
  }
});

//@route: GET /new-posts page
//@desc: retrieve form to create new post
//@access: ADMIN

router.get("/new-post", auth, async (req, res) => {
  console.log("REQ.USER", req.user);
  let user = await User.findById(req.user.id);
  console.log("USER:", user);

  if (!user.admin) {
    return res.status(403).send("Unauthorized Access!");
  }
  //if user is not admin NOT AUTHORIZED
  res.send("Create new post page");
});

//@route: POST /posts/new-post
//@desc: Create a new blog post
//@access: ADMIN

router.post(
  "/new-post",
  auth,
  [check("title", "Title required").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = new Post({
        user: req.user.id,
        name: user.name,
        text: req.body.text,
        title: req.body.title,
        imageURL: req.body.imageURL,
      });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error @ /new-post");
    }
  }
);

router.get("/:id", async (req, res) => {
  res.send("Single post view page");
});

module.exports = router;
