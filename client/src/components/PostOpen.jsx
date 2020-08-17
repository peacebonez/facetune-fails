import React, { useEffect } from "react";
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
  postState: { post, loading },
}) => {
  //Retrieve the post whenever a change in the post takes place
  let { id } = useParams();

  useEffect(() => {
    //added a quick and dirty way to limit constant refreshes
    const limiter = setInterval(() => {
      getOnePost(id);
    }, 250);

    return () => {
      clearInterval(limiter);
    };
  }, [getOnePost, post, id]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete post")) {
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
      <img className="post-img post-img-open" alt="" src={post.imageURL}></img>
      <p className="post-text post-text-open">{post.text}</p>
      {isAuthenticated ? (
        <Scores post={post} postId={id} />
      ) : (
        <Link to="/login" className="scores-link">
          <Scores post={post} postId={id} />
        </Link>
      )}
      {isAdmin && (
        <div style={{ display: "flex" }}>
          <Link to={`/post/edit-post/${id}`}>
            <button className="btn form-btn">Edit Post</button>
          </Link>
          <button className="btn form-btn" onClick={() => handleDelete(id)}>
            Delete Post
          </button>
        </div>
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
      postState: state.post,
    };
  } else {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      postState: state.post,
    };
  }
};

export default connect(mapStateToProps, { getOnePost, deletePost })(PostOpen);
