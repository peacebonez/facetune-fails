import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Error from "./NotFound";

const NewPost = ({ isAdmin }) => {
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
      <form className="form" action="">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="imageURL"
          ></input>
        </div>
        <div className="form-group">
          <textarea
            rows="10"
            className="form-control blog-text"
            placeholder="Blog text"
            name="text"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn form-btn"
            name="submit-post"
          ></input>
        </div>
      </form>
    </div>
  );
};

NewPost.propTypes = {
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => {
  if (state.auth.user) return { isAdmin: state.auth.user.admin };
};

export default connect(mapStateToProps)(NewPost);
