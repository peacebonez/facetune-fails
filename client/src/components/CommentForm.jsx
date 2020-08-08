import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../actions/post-action";
import PropTypes from "prop-types";

import CommentItem from "./CommentItem";

const CommentForm = ({ post, user, isAuthenticated, addComment }) => {
  const [text, setText] = useState("");

  const handleCommentChange = (e) => {
    setText(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    addComment(post._id, { text });
    setText("");
  };

  return (
    <div className="container">
      <h1>
        {post.comments.length}{" "}
        {post.comments.length === 1 ? "comment" : "comments"}
      </h1>
      {isAuthenticated && <h1>{user.name}</h1>}
      <form
        className="form"
        action={`/posts/comment/${post._id}`}
        onSubmit={(e) => submitComment(e)}
      >
        <div className="form-group">
          <textarea
            rows="5"
            className="form-control blog-text"
            placeholder="Add a comment.."
            name="comment"
            value={text}
            onChange={(e) => handleCommentChange(e)}
          ></textarea>
          <div className="post-btn-container">
            <input
              type="submit"
              value="Post"
              className="post-btn"
              disabled={text === "" ? true : false}
            />
          </div>
        </div>
      </form>
      <ul className="container comments-list">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} post={post} />
        ))}
      </ul>
    </div>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  addComment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
