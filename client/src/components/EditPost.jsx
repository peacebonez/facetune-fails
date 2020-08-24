import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { updatePost, getOnePost } from "../actions/post-action";
import PropTypes from "prop-types";

const EditPost = ({ post, isAdmin, updatePost, getOnePost }) => {
  const [formInfo, setFormInfo] = useState({
    title: "",
    imageURL: "",
    text: "",
  });

  const { title, imageURL, text } = formInfo;

  let { id } = useParams();

  useEffect(() => {
    getOnePost(id);
  }, [getOnePost, id]);

  useEffect(() => {
    if (post && !post.loading) {
      setFormInfo({
        title: post.post.title ? post.post.title : "",
        text: post.post.text ? post.post.text : "",
        imageURL: post.post.imageURL ? post.post.imageURL : "",
      });
    }
  }, [post]);

  const formChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    updatePost(formInfo, id);
    setFormInfo({ title: "", imageURL: "", text: "" });
    window.location = "/";
  };

  if (!isAdmin) {
    return <Redirect to="/" />;
  }
  return (
    <div className="new-post">
      <h1 className="large">Edit Post</h1>
      <p>
        <i className="fas fa-user"></i>
        {"     "} Edit post {!post.post.loading && post.post._id}
      </p>
      <form
        className="form"
        action={`/posts/edit-post/${id}`}
        onSubmit={(e) => submitForm(e)}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => formChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="imageURL"
            value={imageURL}
            onChange={(e) => formChange(e)}
          ></input>
        </div>
        <div className="form-group user-text">
          <textarea
            rows="10"
            className="form-control"
            placeholder="Blog text"
            name="text"
            value={text}
            onChange={(e) => formChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <div className="post-btn-container new-edit-btn">
            <input
              type="submit"
              className="post-btn"
              name="submit-post"
              value="Post"
            ></input>
          </div>
        </div>
        <Link className="btn btn-light my-1" to={`/post/${id}`}>
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  updatePost: PropTypes.func.isRequired,
  getOnePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  if (state.auth.user)
    return { isAdmin: state.auth.user.admin, post: state.post };
  else return {};
};

export default connect(mapStateToProps, { updatePost, getOnePost })(EditPost);
