import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, updateHeart } from "../actions/post-action";
import PropTypes from "prop-types";

const CommentItem = ({ comment, post, auth, deleteComment, updateHeart }) => {
  // console.log("Auth:", auth);
  // console.log("comment:", comment);

  //array of users that hearted a comment
  let heartsUsers = comment.hearts.map((heart) => heart.user);

  //length of hearts array
  const [heartsLength, setHeartsLength] = useState(comment.hearts.length);

  //bool if current user hearted a comment (includes auth validation)
  const [userHearted, setUserHearted] = useState(
    !auth.loading && auth.user ? heartsUsers.includes(auth.user._id) : null
  );

  //
  useEffect(() => {
    setUserHearted(
      !auth.loading && auth.user && heartsUsers.includes(auth.user._id)
    );
  }, [auth.loading, comment]);

  // If user is a visitor
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
              {comment.hearts.length > 0 && heartsLength}
            </i>
          </button>
        </Link>
      </div>
    );
  }

  // If user is logged in
  if (!auth.loading && auth.isAuthenticated && auth.user) {
    return (
      <div className="comment-item">
        <div className="comment-header">
          <p style={{ textDecoration: "underline" }}>{comment.name}</p>
          {auth.user._id === comment.user && (
            <button onClick={() => deleteComment(post._id, comment._id)}>
              <i className="fa fa-times"></i>
            </button>
          )}
        </div>
        <Moment format="MM/DD/YYYY">{comment.date}</Moment>
        <p>{comment.text}</p>
        <button
          onClick={() => {
            setUserHearted(!userHearted);
            if (userHearted) setHeartsLength(heartsLength - 1);
            else setHeartsLength(heartsLength + 1);
            updateHeart(post._id, comment._id);
          }}
        >
          <i className={userHearted ? "fas fa-heart" : "far fa-heart"}>
            {heartsLength > 0 && heartsLength}
          </i>
        </button>
      </div>
    );
  }
};

CommentItem.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.object,
  auth: PropTypes.object,
  deleteComment: PropTypes.func,
  updateHeart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteComment,
  updateHeart,
})(CommentItem);
