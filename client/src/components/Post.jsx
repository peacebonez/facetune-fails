import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

const Post = ({
  post: { post, title, name, date, imageURL, text, averageScore, _id },
}) => {
  const [avgScore, setAvgScore] = useState(averageScore);
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
        <h2>Cringe Score: {avgScore}</h2>
        <p className="post-text">{text}</p>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
