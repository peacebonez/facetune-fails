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
import autosize from "autosize";

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

  //length of hearts array
  const [heartsLength, setHeartsLength] = useState(comment.hearts.length);

  //bool if current user hearted a comment (includes auth validation)
  const [userHearted, setUserHearted] = useState(
    !auth.loading && auth.user ? heartsUsers.includes(auth.user._id) : null
  );

  //state of text in the sub-comment
  const [subText, setSubText] = useState("");

  const [repliesShown, setRepliesShown] = useState(true);

  const handleCommentChange = (e) => {
    setSubText(e.target.value);
  };

  const submitSubComment = (e) => {
    e.preventDefault();
    addSubComment(post._id, comment._id, { subText });
    setSubText("");
    // window.location.reload(false);
  };

  //determines upon page load if user has already hearted the comment
  useEffect(() => {
    setUserHearted(
      !auth.loading && auth.user && heartsUsers.includes(auth.user._id)
    );
  }, [auth.loading, comment, auth.user, heartsUsers]);

  //Auto resizes the text area for user
  useEffect(() => {
    autosize(document.querySelector(".reply-area"));
  });

  return (
    <div className="comment-item">
      {/* if logged in */}
      {!auth.loading && auth.isAuthenticated && auth.user ? (
        <Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="comment-header">
              <p style={{ textDecoration: "underline" }}>{comment.name}</p>
              <Moment className="date" format="MM/DD/YYYY">
                {comment.date}
              </Moment>
            </div>
            {auth.user._id === comment.user && (
              <button
                className="btn delete-btn"
                onClick={() => deleteComment(post._id, comment._id)}
              >
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>

          <p className="comment-text">{comment.text}</p>
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
                {"  "}
                <span style={{ color: "#000" }}>
                  {heartsLength > 0 && heartsLength}
                </span>
              </i>
            </button>
            {comment.subComments.length > 0 && repliesShown ? (
              <button
                className="btn show-hide-btn"
                onClick={() => setRepliesShown(!repliesShown)}
              >
                Hide Replies
              </button>
            ) : (
              comment.subComments.length > 0 &&
              !repliesShown && (
                <button
                  className="btn show-hide-btn"
                  onClick={() => setRepliesShown(!repliesShown)}
                >
                  Show Replies ({comment.subComments.length})
                </button>
              )
            )}
          </div>
        </Fragment>
      ) : (
        // if guest
        <Fragment>
          <div
            className="comment-header"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <p style={{ textDecoration: "underline" }}>{comment.name}</p>
            <Moment className="date" format="MM/DD/YYYY">
              {comment.date}
            </Moment>
          </div>

          <p>{comment.text}</p>
          <div style={{ display: "flex" }}>
            <Link to="/login">
              <button className="btn">
                <i className="far fa-heart">
                  {comment.hearts.length > 0 && heartsLength}
                </i>
              </button>
            </Link>
            {comment.subComments.length > 0 && repliesShown ? (
              <button
                className="btn show-hide-btn"
                onClick={() => setRepliesShown(!repliesShown)}
              >
                Hide Replies
              </button>
            ) : (
              comment.subComments.length > 0 &&
              !repliesShown && (
                <button
                  className="btn show-hide-btn"
                  onClick={() => setRepliesShown(!repliesShown)}
                >
                  Show Replies ({comment.subComments.length})
                </button>
              )
            )}
          </div>
        </Fragment>
      )}
      <div className="sub-comment-list">
        <ul>
          {repliesShown &&
            comment.subComments &&
            comment.subComments.map((subComment) => (
              <SubComment
                subComment={subComment}
                post={post}
                comment={comment}
                key={subComment._id}
              />
            ))}
        </ul>
      </div>
      {!auth.loading && auth.isAuthenticated && repliesShown && (
        <form
          className="form"
          action={`/posts/${post._id}/comment/${comment._id}`}
          onSubmit={(e) => submitSubComment(e)}
        >
          <div className="form-group">
            <textarea
              rows="1"
              className="form-control reply-area"
              placeholder="Reply..."
              name="reply"
              value={subText}
              onChange={(e) => handleCommentChange(e)}
            ></textarea>
            <div className="post-btn-container" id="reply-btn">
              <input
                type="submit"
                value="Post"
                className="post-btn"
                disabled={subText === "" ? true : false}
              />
            </div>
          </div>
        </form>
      )}
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
  // isAdmin: state.auth.user.admin,
});

export default connect(mapStateToProps, {
  deleteComment,
  updateHeart,
  addSubComment,
})(CommentItem);
