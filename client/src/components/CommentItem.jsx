import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const CommentItem = ({ comment }) => {
  //delete if user.id === post.user delete button appears
  return (
    <div className="comment-item">
      <div className="comment-header">
        <p style={{ textDecoration: "underline" }}>{comment.name}</p>
        <p>X</p>
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

export default CommentItem;
