import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CommentForm = ({ post, user, isAuthenticated }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <div>
      <h1>{post.comments.length} comments</h1>
      {isAuthenticated && <h1>{user.name}</h1>}
      <form className="form" action="">
        <div className="form-group">
          <textarea
            rows="5"
            className="form-control blog-text"
            placeholder="Add a comment.."
            name="comment"
            value={comment}
            onChange={(e) => handleCommentChange(e)}
          ></textarea>
          <div className="post-btn-container">
            <input
              type="submit"
              value="Post"
              className="post-btn"
              disabled={comment === "" ? true : false}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(CommentForm);
