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
  let user = await User.findById(req.user.id);
  console.log("USER:", user);

  //if user is not admin NOT AUTHORIZED
  if (!user.admin) {
    return res.status(403).send("Unauthorized Access!");
  }

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

      //if user is not admin NOT AUTHORIZED
      if (!user.admin) {
        return res.status(403).send("Unauthorized Access!");
      }

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

//@route: GET /posts/:id
//@desc: Get a single blog post
//@access: PUBLIC

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    if (!post) {
      return res.status(400).send("Bad Request");
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error at GET ONE POST");
  }
});

//@route: POST /posts/
//@desc: Delete a post
//@access: ADMIN

router.delete("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    console.log("USER:", user);

    //if user is not admin NOT AUTHORIZED
    if (!user.admin) {
      return res.status(403).send("Unauthorized Access!");
    }
    await Post.findByIdAndRemove(req.params.id);
  } catch (err) {
    return res.status(400).send("Cannot delete post. Post not found!");
  }
});

module.exports = router;
