import React, { useState } from "react";
import Moment from "react-moment";
import { deleteSubComment, updateSubHeart } from "../actions/post-action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SubComment = ({
  post,
  comment,
  subComment,
  deleteSubComment,
  updateSubHeart,
  auth,
}) => {
  //array of users that hearted a comment
  let heartsUsers = subComment.subHearts.map((heart) => heart.user);

  //length of hearts array
  const [heartsLength, setHeartsLength] = useState(subComment.subHearts.length);

  //bool if current user hearted a comment (includes auth validation)
  const [userHearted, setUserHearted] = useState(
    !auth.loading && auth.user ? heartsUsers.includes(auth.user._id) : null
  );

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
                className="btn delete-btn"
                onClick={() => {
                  deleteSubComment(post._id, comment._id, subComment._id);
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            )}
        </div>
        <p className="comment-text">{subComment.subText}</p>
        {!auth.loading && auth.isAuthenticated ? (
          <button
            className="heart-btn"
            onClick={() => {
              setUserHearted(!userHearted);
              if (userHearted) setHeartsLength(heartsLength - 1);
              else setHeartsLength(heartsLength + 1);
              updateSubHeart(post._id, comment._id, subComment._id);
            }}
          >
            <i className={userHearted ? "fas fa-heart" : "far fa-heart"}>
              {"  "}
              <span style={{ color: "#000" }}>
                {heartsLength > 0 && heartsLength}
              </span>
            </i>
          </button>
        ) : (
          <Link to="/login">
            <button className="btn">
              <i className="far fa-heart">
                <span style={{ color: "#000" }}>
                  {subComment.subHearts.length > 0 && heartsLength}
                </span>
              </i>
            </button>
          </Link>
        )}
      </div>
    </li>
  );
};

SubComment.propTypes = {
  post: PropTypes.object,
  comment: PropTypes.object,
  subComment: PropTypes.object,
  deleteSubComment: PropTypes.func,
  updateSubHeart: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteSubComment, updateSubHeart })(
  SubComment
);
