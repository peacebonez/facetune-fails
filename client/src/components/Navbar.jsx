import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-xl">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>FaceTune Fails</h1>
      </Link>
      <ul>
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
        <li>
          <Link
            to="/top-posts"
            className="navlink"
            style={{ textDecoration: "none" }}
          >
            Top Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
