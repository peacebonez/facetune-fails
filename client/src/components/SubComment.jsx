import React, { useState } from "react";
import Moment from "react-moment";
import { deleteSubComment } from "../actions/post-action";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SubComment = ({ comment, subComment, deleteSubComment, auth }) => {
  console.log("subComment:", subComment);
  return (
    <li className="sub-comment-item">
      <div className="sub-comment-container">
        <div className="comment-header">
          <p style={{ textDecoration: "underline" }}>{subComment.subName}</p>
          <Moment format="MM/DD/YYYY">{subComment.subDate}</Moment>
          {!auth.loading &&
            auth.isAuthenticated &&
            auth.user._id === subComment.subUser && (
              <button
                onClick={() => deleteSubComment(comment._id, subComment._id)}
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
  comment: PropTypes.object,
  subComment: PropTypes.object,
  deleteSubComment: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteSubComment })(SubComment);
