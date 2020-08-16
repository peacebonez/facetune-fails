import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { addPost, getOnePost } from "../actions/post-action";
import PropTypes from "prop-types";

const EditPost = ({ post, isAdmin, addPost, getOnePost }) => {
  console.log("post:", post);
  const [formInfo, setFormInfo] = useState({
    title: "",
    imageURL: "",
    text: "",
  });
  //   const [formInfo, setFormInfo] = useState({
  //     title: !post.loading && post.title ? post.title : "",
  //     imageURL: !post.loading && post.imageURL ? post.imageURL : "",
  //     text: !post.loading && post.text ? post.text : "",
  //   });

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
      console.log("formInfo:", formInfo);
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
    addPost(formInfo);
    setFormInfo({ title: "", imageURL: "", text: "" });
  };

  if (!isAdmin) {
    return <Redirect to="/" />;
  }
  return (
    <div className="new-post">
      <h1 className="large">Edit Post</h1>
      <p>
        <i className="fas fa-user"></i>
        {"     "} Edit post
      </p>
      <form
        className="form"
        action="/posts/new-post"
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
        <div className="form-group">
          <textarea
            rows="10"
            className="form-control blog-text"
            placeholder="Blog text"
            name="text"
            value={text}
            onChange={(e) => formChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <div className="post-btn-container">
            <input
              type="submit"
              className="post-btn"
              name="submit-post"
              value="Post"
              disabled={formInfo.text === "" ? true : false}
            ></input>
          </div>
        </div>
        <Link className="btn btn-light my-1" to="/">
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditPost.propTypes = {
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => {
  if (state.auth.user)
    return { isAdmin: state.auth.user.admin, post: state.post };
  else return {};
};

export default connect(mapStateToProps, { addPost, getOnePost })(EditPost);
