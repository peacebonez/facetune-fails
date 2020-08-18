import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { addPost } from "../actions/post-action";
import PropTypes from "prop-types";

const NewPost = ({ isAdmin, addPost }) => {
  const [formInfo, setFormInfo] = useState({
    title: "",
    imageURL: "",
    text: "",
  });

  const { title, imageURL, text } = formInfo;

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
      <h1 className="large">New Post</h1>
      <p>
        <i className="fas fa-user"></i>
        {"     "} Create a new post
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
              // disabled={formInfo.text === "" ? true : false}
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

NewPost.propTypes = {
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => {
  if (state.auth.user) return { isAdmin: state.auth.user.admin };
  else return {};
};

export default connect(mapStateToProps, { addPost })(NewPost);
