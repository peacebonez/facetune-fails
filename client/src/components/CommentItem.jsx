import React, { useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment, addHeart, removeHeart } from "../actions/post-action";
import PropTypes from "prop-types";

const CommentItem = ({
  comment,
  post,
  auth,
  deleteComment,
  addHeart,
  removeHeart,
}) => {
  const heartsUsers = comment.hearts.map((heart) => heart.user);

  return (
    <div className="comment-item">
      <div className="comment-header">
        <p style={{ textDecoration: "underline" }}>{comment.name}</p>
        {!auth.loading &&
          auth.user !== null &&
          auth.user._id === comment.user && (
            <button onClick={() => deleteComment(post._id, comment._id)}>
              X
            </button>
          )}
      </div>
      <Moment format="MM/DD/YYYY">{comment.date}</Moment>
      <p>{comment.text}</p>
      {!auth.loading && heartsUsers.includes(auth.user._id) && (
        <button onClick={() => removeHeart(post._id, comment._id)}>
          <i className="fas fa-heart">{comment.hearts.length}</i>
        </button>
      )}
      {!auth.loading && !heartsUsers.includes(auth.user._id) && (
        <button onClick={() => addHeart(post._id, comment._id)}>
          <i className="far fa-heart">{comment.hearts.length}</i>
        </button>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteComment,
  addHeart,
  removeHeart,
})(CommentItem);
