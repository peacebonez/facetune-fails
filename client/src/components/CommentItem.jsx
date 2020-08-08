import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, updateHeart } from "../actions/post-action";
import PropTypes from "prop-types";

const CommentItem = ({ comment, post, auth, deleteComment, updateHeart }) => {
  let heartsUsers = comment.hearts.map((heart) => heart.user);
  console.log("heartsUsers:", heartsUsers);
  let [userHearted, setUserHearted] = useState(null);
  // let [heartsUsers, setHeartsUsers] = useState(
  //   comment.hearts.map((heart) => heart.user)
  // );

  // console.log("Auth:", auth);

  // useEffect(() => {}, [userHearted]);

  if (!auth.isAuthenticated) {
    return (
      <div className="comment-item">
        <div className="comment-header">
          <p style={{ textDecoration: "underline" }}>{comment.name}</p>
        </div>
        <Moment format="MM/DD/YYYY">{comment.date}</Moment>
        <p>{comment.text}</p>
        <Link to="/login">
          <button>
            <i className="far fa-heart">
              {comment.hearts.length > 0 && comment.hearts.length}
            </i>
          </button>
        </Link>
      </div>
    );
  }
  if (!auth.loading && auth.isAuthenticated) {
    // setUserHearted(heartsUsers.includes(auth.user._id));
    // console.log("user hearted state:", userHearted);
    return (
      <div className="comment-item">
        <div className="comment-header">
          <p style={{ textDecoration: "underline" }}>{comment.name}</p>
          {auth.user._id === comment.user && (
            <button onClick={() => deleteComment(post._id, comment._id)}>
              X
            </button>
          )}
        </div>
        <Moment format="MM/DD/YYYY">{comment.date}</Moment>
        <p>{comment.text}</p>
        <button
          onClick={() => {
            updateHeart(post._id, comment._id);
            setUserHearted(!heartsUsers.includes(auth.user._id));
          }}
        >
          <i className={userHearted ? "fas fa-heart" : "far fa-heart"}>
            {comment.hearts.length > 0 && comment.hearts.length}
          </i>
        </button>
      </div>
    );
  }
};

CommentItem.propTypes = {
  comment: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteComment,
  updateHeart,
})(CommentItem);
