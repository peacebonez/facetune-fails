import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../actions/post-action";
import PropTypes from "prop-types";

const CommentItem = ({ comment, post, auth, deleteComment }) => {
  console.log("AUTH", auth);
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
      <i className={comment.hearts ? "fas" : "far" + " fa-heart"}>
        {comment.hearts ? comment.hearts.length : 0}
      </i>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
