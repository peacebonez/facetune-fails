import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-xl">
      <Link to="/">
        <h1>FaceTune Fails</h1>
      </Link>
      <div>
        <Link to="/login" className="navlink">
          Login
        </Link>
        <Link to="/register" className="navlink">
          Register
        </Link>
        <Link to="/top-posts" className="navlink">
          Top Posts
        </Link>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
