import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Post = ({
  post: { title, name, date, imageURL, text, averageScore, _id },
}) => {
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
          <img className="post-img" alt="" src={imageURL}></img>
        </Link>
        <h2>Cringe Score: {averageScore}</h2>
        <p className="post-text">{text}</p>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
