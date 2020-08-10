import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

export const determineScore = (arr) => {
  console.log("arr:", arr);
  if (!arr) return "-";

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].val;
  }

  const output = Math.round(sum / arr.length);
  return !output ? "-" : output;
};

const Post = ({ post: { title, name, date, imageURL, score, text, _id } }) => {
  return (
    <li className="post">
      <div className="post-body">
        <Link to={`/post/${_id}`}>
          <h3 className="post-header">{title}</h3>
        </Link>
        <p className="post-details">
          {name} · <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        <Link to={`/post/${_id}`}>
          <img className="post-img" src={imageURL}></img>
        </Link>
        <h2>Cringe Score: {determineScore(score)}</h2>
        <p className="post-text">{text}</p>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
