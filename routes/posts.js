var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Post = require("../models/Post");
const User = require("../models/User");

//@route: GET /posts
//@desc: retrieve initial posts
//@access: Public

router.get("/", async function (req, res) {
  try {
    const posts = await Post.find().sort({ date: -1 }).limit(10);

    if (posts.length < 1) {
      return res.status(400).json({ msg: "No posts found" });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error at GET posts");
  }
});

//@route: GET /posts
//@desc: retrieve more posts
//@access: Public
// router.get("/page/:pageNum", async function (req, res) {

router.get("/page-:pageNum", async function (req, res) {
  try {
    let pageNum = Number(req.params.pageNum);

    const posts = await Post.find()
      .sort({ date: -1 })
      .skip(10 * pageNum)
      .limit(10);

    if (posts.length < 1) {
      return res.status(404).json({ msg: "No posts found" });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error at GET MORE posts");
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
    return res.json({ msg: "Post removed!" });
  } catch (err) {
    return res.status(400).send("Cannot delete post. Post not found!");
  }
});

//@route: POST /posts/comment
//@desc: Create a comment
//@access: Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Comment text is require").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      //Create a new comment

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      post.comments = [newComment, ...post.comments];

      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route: POST /posts/comment
//@desc: Create a comment
//@access: Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  //match user to user of post
  try {
    // find the post by url parameter
    const post = await Post.findById(req.params.id);

    //match the comment to the url parameter
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "No comment to find" });
    }

    //finding index of userId in comments array
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error at delete comment!");
  }
});

//@route: PUT /posts/comment/heart/postId/commentId
//@desc: Add or remove heart to a comment
//@access: Private

router.put("/comment/heart/:post_Id/:comment_Id", auth, async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Must login to heart a comment");
  }
  try {
    const post = await Post.findById(req.params.post_Id);

    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_Id
    );

    const userHearts = comment.hearts.map((heart) => heart.user.toString());
    // console.log("USERHEARTS:", userHearts);

    if (userHearts.includes(req.user.id)) {
      //unheart
      let targetIndex = userHearts.indexOf(req.user.id);
      comment.hearts.splice(targetIndex, 1);

      await post.save();
      console.log("comment.hearts.length:", comment.hearts.length);
      return res.json(comment.hearts);
    } else {
      //heart
      comment.hearts = [{ user: req.user.id }, ...comment.hearts];

      await post.save();
      console.log("comment.hearts.length:", comment.hearts.length);
      return res.json(comment.hearts);
    }
  } catch (err) {
    res.status(500).send("Server Error at updating a heart!");
  }
});

//@route: PUT /posts/postId
//@desc: Update post score
//@access: Private

router.post("/score/:post_Id", auth, async (req, res) => {
  if (!req.user) {
    return res.status(403).send("Must login to submit a score.");
  }

  console.log("req", req);

  try {
    const post = await Post.findById(req.params.post_Id);
    //array of all the users that have submitted scores
    const scoresUsers = post.score.map((scr) => scr.user);

    const newScore = {
      val: req.body.userScore,
      user: req.user.id,
    };

    //if user has NOT posted a score yet
    if (!scoresUsers.includes(req.user.id)) {
      post.score = [newScore, ...post.score];
    } else {
      //find the user's entry and update the score
      const targetIndex = scoresUsers.indexOf(req.user.id);
      post.score.splice(targetIndex, 1);
      post.score = [newScore, ...post.score];
    }

    await post.save();

    return res.json(post.score);
  } catch (err) {
    res.status(500).send("Error with submitting post score.");
  }
});

module.exports = router;
