import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth-action";

const Navbar = ({ isAuthenticated, logout }) => {
  console.log("isAuthenticated:", isAuthenticated);
  return (
    <nav className="navbar navbar-expand-xl">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>FaceTune Fails</h1>
      </Link>
      <ul>
        <li>
          <Link
            to="/top-posts"
            className="navlink"
            style={{ textDecoration: "none" }}
          >
            Top Posts
          </Link>
        </li>
        {!isAuthenticated ? (
          <Fragment>
            <li>
              <Link
                to="/login"
                className="navlink"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="navlink"
                style={{ textDecoration: "none" }}
              >
                Register
              </Link>
            </li>
          </Fragment>
        ) : (
          <li>
            <Link
              to=""
              className="navlink"
              onClick={logout}
              style={{ textDecoration: "none" }}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("STATE:", state);
  return { isAuthenticated: state.auth.isAuthenticated };
};
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(mapStateToProps, { logout })(Navbar);
