import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <div>
      <h1 className="large">Sign In</h1>
      <p>
        <i className="fas fa-user"></i>Login Into Your Account
      </p>
      <form className="form" action="">
        <div className="form-group">
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
          <input className="btn form-btn" type="submit" value="Login"></input>
        </div>
      </form>
      <p>
        Don't have an account with us? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {};

export default Login;
