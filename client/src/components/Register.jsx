import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/auth-action";

const Register = ({ register, isAuthenticated }) => {
  const [formInfo, setFormInfo] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formInfo;

  const formChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (password !== password2) {
      //ToDo
      return alert("Passwords do not match");
    }

    register({ username, email, password });
  };

  if (isAuthenticated)
    return (
      <div>
        <h1 className="large">Sign Up</h1>
        <p>
          <i className="fas fa-user"></i>Create Your Account
        </p>
        <form className="form" action="/users">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              name="username"
              // required
            ></input>
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              name="email"

              // required
            ></input>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"

              // required
            ></input>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              name="password2"

              // required
            ></input>
            <input
              className="btn form-btn"
              type="submit"
              name="register"
            ></input>
          </div>
        </form>
        <p>
          Already have an account with us? <Link to="/login">Sign In</Link>
        </p>
      </div>
    );
};

Register.propTypes = {};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
