import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Register = (props) => {
  return (
    <div>
      <h1 className="large">Sign Up</h1>
      <p>
        <i className="fas fa-user"></i>Create Your Account
      </p>
      <form className="form" action="">
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
          <input className="btn form-btn" type="submit" name="register"></input>
        </div>
      </form>
      <p>
        Already have an account with us? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {};

export default Register;
