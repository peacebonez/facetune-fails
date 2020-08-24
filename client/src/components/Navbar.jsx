import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth-action";
import Dropdown from "./Dropdown";

const Navbar = ({ isAuthenticated, isAdmin, name, logout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 867);
  const [dropdown, setDropdown] = useState(false);
  console.log("dropdown:", dropdown);
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      setIsMobile(window.innerWidth < 877);
      console.log("isMobile:", isMobile);
    });
  }, [window.innerWidth, isMobile]);
  return (
    <nav className="navbar navbar-expand-xl">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>
          <span id="facetune-title">FaceTune</span>
          {"  "}
          <span id="fails-title">Fails</span>
        </h1>
      </Link>
      {isMobile ? (
        <Fragment>
          <Dropdown
            style={{ display: `${dropdown ? "block" : "none"}` }}
            dropdown={dropdown}
            setDropdown={setDropdown}
          />
          <div
            className={`dropdown-container ${dropdown ? "dropdown-shown" : ""}`}
            style={{ display: `${dropdown ? "block" : "none"}` }}
          >
            <ul>
              {isAdmin && (
                <li>
                  <Link
                    to="/new-post"
                    className="navlink"
                    style={{ textDecoration: "none" }}
                  >
                    New Post
                  </Link>
                </li>
              )}
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
                <Fragment>
                  <li>
                    <Link
                      to="/profile"
                      className="navlink"
                      style={{ textDecoration: "none" }}
                    >
                      {name}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="navlink"
                      onClick={() => logout()}
                      style={{ textDecoration: "none" }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </Fragment>
      ) : (
        <ul>
          {isAdmin && (
            <li>
              <Link
                to="/new-post"
                className="navlink"
                style={{ textDecoration: "none" }}
              >
                New Post
              </Link>
            </li>
          )}
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
            <Fragment>
              <li>
                <Link
                  to="/profile"
                  className="navlink"
                  style={{ textDecoration: "none" }}
                >
                  {name}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="navlink"
                  onClick={() => logout()}
                  style={{ textDecoration: "none" }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  name: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  // console.log("STATE:", state);
  // console.log("USER:", state.auth.user);
  if (state.auth.user) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: state.auth.user.admin,
      name: state.auth.user.name,
    };
  } else {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }
};
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(mapStateToProps, { logout })(Navbar);
