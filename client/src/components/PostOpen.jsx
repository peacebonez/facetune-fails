import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getOnePost } from "../actions/post-action";
import { addScore, deletePost } from "../actions/post-action";
import Moment from "react-moment";

import Loading from "../components/Loading";
import CommentForm from "../components/CommentForm";

const PostOpen = ({
  getOnePost,
  addScore,
  deletePost,
  isAdmin,
  post: { post, loading, _id },
}) => {
  const [userScore, setUserScore] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    getOnePost(id);
    console.log("UserScore:", userScore);
  }, [getOnePost, userScore]);

  const handleDelete = (id) => {
    let question = window.confirm("Are you sure you want to delete post");
    if (question) {
      deletePost(id);
      document.location.pathname = "/";
    } else return;
  };

  const scoreChange = (e) => {
    setUserScore(e.target.value);
    addScore(id, userScore);
  };

  return loading || post === null ? (
    <Loading type="spokes" />
  ) : (
    <div className="post-body post-body-open">
      <h3 className="post-header post-header-open">{post.title}</h3>
      <p className="post-details post-details-open">
        {post.name} · <Moment format="MM/DD/YYYY">{post.date}</Moment>
      </p>
      <img className="post-img post-img-open" src={post.imageURL}></img>
      <p className="post-text post-text-open">{post.text}</p>
      <div className="score-container">
        <h3 className="post-header-open">Cringe Score</h3>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score1"
            value="1"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score1">
            1
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score2"
            value="2"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score2">
            2
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score3"
            value="3"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score3">
            3
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score4"
            value="4"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score4">
            4
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score5"
            value="5"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score5">
            5
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score6"
            value="6"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score6">
            6
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score7"
            value="7"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score7">
            7
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score8"
            value="8"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score8">
            8
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score9"
            value="9"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score9">
            9
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score10"
            value="10"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" htmlFor="score10">
            10
          </label>
        </div>
        {isAdmin && (
          <button className="btn form-btn" onClick={() => handleDelete(id)}>
            Delete Post
          </button>
        )}
      </div>
      <CommentForm post={post} />
    </div>
  );
};

PostOpen.propTypes = {
  post: PropTypes.object,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => {
  console.log("STATE POST FROM REDUCER:", state.post);

  if (state.auth.user) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: state.auth.user.admin,
      post: state.post,
    };
  } else {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      post: state.post,
    };
  }
};

export default connect(mapStateToProps, { getOnePost, addScore, deletePost })(
  PostOpen
);
