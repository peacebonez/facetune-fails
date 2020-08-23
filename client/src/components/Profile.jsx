import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editUser } from "../actions/auth-action";
import { addErrorBorder } from "../actions/alert-action";

const Profile = ({ isAuthenticated, editUser }) => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    password: "",
    newPassword: "",
    newPassword2: "",
  });

  const formChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!password) return addErrorBorder('input[name="password"]');
    if (newPassword !== newPassword2) {
      addErrorBorder('input[name="newPassword"]');
      addErrorBorder('input[name="newPassword2"]');
      return;
    }

    editUser({ name, password, newPassword, newPassword2 });
  };

  const { name, password, newPassword, newPassword2 } = formInfo;

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-reg-container">
      <h1 className="large">Profile</h1>
      <p>
        <i className="fas fa-user"></i> Edit Profile
      </p>
      <form className="form" action="/users" onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="New username"
            name="name"
            value={name}
            onChange={(e) => formChange(e)}
          ></input>
          <input
            className="form-control"
            type="password"
            placeholder="Current password"
            name="password"
            value={password}
            onChange={(e) => formChange(e)}
            autoComplete="on"
          ></input>
          <input
            className="form-control"
            type="password"
            placeholder="New password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => formChange(e)}
            autoComplete="on"
          ></input>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm new password"
            name="newPassword2"
            value={newPassword2}
            onChange={(e) => formChange(e)}
          ></input>
          <input className="btn form-btn" type="submit" name="register"></input>
        </div>
      </form>
    </div>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  editUser: PropTypes.func,
});

export default connect(mapStateToProps, { editUser })(Profile);
