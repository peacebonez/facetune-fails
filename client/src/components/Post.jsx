import React from "react";
import PropTypes from "prop-types";

const Post = (props) => {
  return (
    <li className="post">
      <div className="post-body">
        <h3 className="post-header">Title</h3>
        <p className="post-details">Kevin Pariso · 08/22/2017</p>
        <img
          className="post-img"
          src="https://images.gawker.com/feageomtd6muf2zslnw1/c_scale,fl_progressive,q_80,w_800.png"
        ></img>
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
