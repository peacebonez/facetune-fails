import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//user is auth through connect
const testPost = {
  title: "The end is here. How a company failed",
  user: "Kevin Pariso",
  imageURL:
    "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/NexGen/ContentPage/paint-color-neutrals2.jpg",
  score: 7,
  text:
    "Junge mit du nun schnee du vaterland, weiter es brust trübhell niedlich ferne es geschaut ort ort, einz'ges deiner dann ruft oft gehn teuren glück gartens, wiedersehn vom gefärbt du.",
  date: "08/22/2017",
};

const Post = ({ post: { title, user, date, imageURL, score, text } }) => {
  // console.log("POST:", post);
  return (
    <li className="post">
      <div className="post-body">
        <Link to="">
          <h3 className="post-header">{title}</h3>
        </Link>
        <p className="post-details">
          {user} · {date}
        </p>
        <Link to="">
          <img className="post-img" src={imageURL}></img>
        </Link>
        <h2>Rating: {score}</h2>
        <p className="post-text">{text}</p>
      </div>
    </li>
  );
};

Post.propTypes = {};

export default Post;
