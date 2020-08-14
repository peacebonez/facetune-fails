import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteComment,
  updateHeart,
  addSubComment,
} from "../actions/post-action";
import PropTypes from "prop-types";

import SubComment from "./SubComment";

const CommentItem = ({
  comment,
  post,
  auth,
  deleteComment,
  updateHeart,
  addSubComment,
}) => {
  //array of users that hearted a comment
  let heartsUsers = comment.hearts.map((heart) => heart.user);
  // console.log("comment._id:", comment._id);
  //length of hearts array
  const [heartsLength, setHeartsLength] = useState(comment.hearts.length);

  //bool if current user hearted a comment (includes auth validation)
  const [userHearted, setUserHearted] = useState(
    !auth.loading && auth.user ? heartsUsers.includes(auth.user._id) : null
  );

  const [subText, setSubText] = useState("");

  const handleCommentChange = (e) => {
    setSubText(e.target.value);
  };

  const submitSubComment = (e) => {
    e.preventDefault();
    addSubComment(post._id, comment._id, { subText });
    setSubText("");
  };

  //
  useEffect(() => {
    setUserHearted(
      !auth.loading && auth.user && heartsUsers.includes(auth.user._id)
    );
  }, [auth.loading, comment]);

  return (
    <div className="comment-item">
      {!auth.loading && auth.isAuthenticated && auth.user ? (
        <Fragment>
          <div className="comment-header">
            <p style={{ textDecoration: "underline" }}>{comment.name}</p>
            <Moment format="MM/DD/YYYY">{comment.date}</Moment>
            {auth.user._id === comment.user && (
              <button onClick={() => deleteComment(post._id, comment._id)}>
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
          <p>{comment.text}</p>
          <div style={{ display: "flex" }}>
            <button
              className="heart-btn"
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
            {comment.subComments.length > 0 && <p>Hide Replies</p>}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="comment-header">
            <p style={{ textDecoration: "underline" }}>{comment.name}</p>
          </div>
          <Moment format="MM/DD/YYYY">{comment.date}</Moment>
          <p>{comment.text}</p>
          <div style={{ display: "flex" }}>
            <Link to="/login">
              <button>
                <i className="far fa-heart">
                  {comment.hearts.length > 0 && heartsLength}
                </i>
              </button>
            </Link>
            {comment.subComments.length > 0 && <p>Hide Replies</p>}
          </div>
        </Fragment>
      )}
      <div className="sub-comment-list">
        <ul>
          {comment.subComments &&
            comment.subComments.map((subComment) => (
              <SubComment
                subComment={subComment}
                comment={comment}
                key={subComment._id}
              />
            ))}
        </ul>
      </div>
      <form
        className="form"
        action={`/posts/${post._id}/comment/${comment._id}`}
        onSubmit={(e) => submitSubComment(e)}
      >
        <div className="form-group">
          <textarea
            rows="1"
            className="form-control blog-text"
            placeholder="Add a reply.."
            name="reply"
            value={subText}
            onChange={(e) => handleCommentChange(e)}
          ></textarea>
          <div className="post-btn-container">
            <input
              type="submit"
              value="Post"
              className="post-btn"
              disabled={subText === "" ? true : false}
            />
          </div>
        </div>
      </form>
    </div>
  );
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
  addSubComment,
})(CommentItem);
