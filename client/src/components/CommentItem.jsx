import React, { useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, updateHeart } from "../actions/post-action";
import PropTypes from "prop-types";

const CommentItem = ({ comment, post, auth, deleteComment, updateHeart }) => {
  let heartsUsers = comment.hearts.map((heart) => heart.user);
  let [userHearted, setUserHearted] = useState(null);
  // let [heartsUsers, setHeartsUsers] = useState(
  //   comment.hearts.map((heart) => heart.user)
  // );

  // let [clicked, setClicked] = useState(false);

  // console.log("Auth:", auth);
  console.log("heartsusers:", heartsUsers);
  // console.log("user hearted state:", userHearted);

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
  if (auth.isAuthenticated) {
    return (
      <div className="comment-item">
        <div className="comment-header">
          <p style={{ textDecoration: "underline" }}>{comment.name}</p>
          {!auth.loading && auth.user._id === comment.user && (
            <button onClick={() => deleteComment(post._id, comment._id)}>
              X
            </button>
          )}
        </div>
        <Moment format="MM/DD/YYYY">{comment.date}</Moment>
        <p>{comment.text}</p>
        {!auth.loading && (
          <button
            onClick={() => {
              updateHeart(post._id, comment._id);
              setUserHearted(!heartsUsers.includes(auth.user._id));
            }}
          >
            {/* <i className="far fa-heart"> */}
            <i className={userHearted ? "fas fa-heart" : "far fa-heart"}>
              {/* <i className={clicked ? "fas fa-heart" : "far fa-heart"}> */}
              {comment.hearts.length > 0 && comment.hearts.length}
            </i>
          </button>
        )}
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
