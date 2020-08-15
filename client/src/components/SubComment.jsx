import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { deleteSubComment } from "../actions/post-action";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SubComment = ({ post, comment, subComment, deleteSubComment, auth }) => {
  console.log("comment:", comment);
  return (
    <li className="sub-comment-item">
      <div className="sub-comment-container">
        <div className="comment-header">
          <div style={{ display: "flex" }}>
            <p style={{ textDecoration: "underline" }}>{subComment.subName}</p>
            <Moment format="MM/DD/YYYY">{subComment.subDate}</Moment>
          </div>
          {!auth.loading &&
            auth.isAuthenticated &&
            auth.user._id === subComment.subUser && (
              <button
                className="delete-btn"
                onClick={() => {
                  deleteSubComment(post._id, comment._id, subComment._id);
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            )}
        </div>
        <p>{subComment.subText}</p>
      </div>
    </li>
  );
};

SubComment.propTypes = {
  post: PropTypes.object,
  comment: PropTypes.object,
  subComment: PropTypes.object,
  deleteSubComment: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // comment: state.post.comment,
});

export default connect(mapStateToProps, { deleteSubComment })(SubComment);
