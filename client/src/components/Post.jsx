import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <li className="post">
      <div className="post-body">
        <Link to="">
          <h3 className="post-header">The end is here. How a company failed</h3>
        </Link>
        <p className="post-details">Kevin Pariso · 08/22/2017</p>
        <Link to="">
          <img
            className="post-img"
            src="https://images.gawker.com/feageomtd6muf2zslnw1/c_scale,fl_progressive,q_80,w_800.png"
          ></img>
        </Link>
        <p className="post-text">
          Junge mit du nun schnee du vaterland, weiter es brust trübhell
          niedlich ferne es geschaut ort ort, einz'ges deiner dann ruft oft gehn
          teuren glück gartens, wiedersehn vom gefärbt du.
        </p>
      </div>
    </li>
  );
};

Post.propTypes = {};

export default Post;
