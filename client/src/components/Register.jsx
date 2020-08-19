import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/auth-action";

const Register = ({ register, isAuthenticated }) => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formInfo;

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

    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login-reg-container">
      <h1 className="large">Sign Up</h1>
      <p>
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="/users" onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            name="name"
            value={name}
            onChange={(e) => formChange(e)}
            // required
          ></input>
          <input
            className="form-control"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => formChange(e)}
            autoComplete="on"

            // required
          ></input>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => formChange(e)}
            autoComplete="on"

            // required
          ></input>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => formChange(e)}

            // required
          ></input>
          <input className="btn form-btn" type="submit" name="register"></input>
        </div>
      </form>
      <p>
        Already have an account with us? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
