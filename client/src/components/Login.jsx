import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../actions/auth-action";

const Login = ({ isAuthenticated, login }) => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formInfo;

  const formChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-reg-container">
      <h1 className="large">Sign In</h1>
      <p>
        <i className="fas fa-user"></i>Login Into Your Account
      </p>
      <form className="form" action="/auth" onSubmit={(e) => formSubmit(e)}>
        <div className="form-group">
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
          <input className="btn form-btn" type="submit" value="Login"></input>
        </div>
      </form>
      <p>
        Don't have an account with us? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
