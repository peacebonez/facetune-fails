import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOnePost, deletePost } from "../actions/post-action";
import Moment from "react-moment";

import Loading from "../components/Loading";
import CommentForm from "../components/CommentForm";
import Scores from "../components/Scores";

const PostOpen = ({
  getOnePost,
  deletePost,
  isAdmin,
  isAuthenticated,
  post: { post, loading },
}) => {
  // console.log("POST:", post);
  let { id } = useParams();
  useEffect(() => {
    getOnePost(id);
  }, [getOnePost]);

  const handleDelete = (id) => {
    const question = window.confirm("Are you sure you want to delete post");
    if (question) {
      deletePost(id);
      return (document.location.pathname = "/");
    } else return;
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
      {isAuthenticated ? (
        <Scores post={post} postId={id} />
      ) : (
        <Link to="/login">
          <Scores post={post} postId={id} />
        </Link>
      )}
      {isAdmin && (
        <button className="btn form-btn" onClick={() => handleDelete(id)}>
          Delete Post
        </button>
      )}
      <CommentForm post={post} postId={id} />
    </div>
  );
};

PostOpen.propTypes = {
  post: PropTypes.object,
  isAdmin: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  getOnePost: PropTypes.func,
  deletePost: PropTypes.func,
};

const mapStateToProps = (state) => {
  // console.log("STATE POST FROM REDUCER:", state.post);

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

export default connect(mapStateToProps, { getOnePost, deletePost })(PostOpen);
