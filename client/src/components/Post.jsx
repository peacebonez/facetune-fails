import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Post = ({
  post: { title, name, date, imageURL, text, averageScore, _id },
}) => {
  const textPreview = text.substr(0, 100);
  return (
    <li className="post">
      <div className="post-body">
        <Link to={`/post/${_id}`} className="post-header-link">
          <h3 className="post-header">{title}</h3>
        </Link>
        <p className="post-details">
          {name} · <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        <Link to={`/post/${_id}`} className="post-img-link">
          <img className="img-fluid post-img" alt="" src={imageURL}></img>
        </Link>
        <h2 className=" lead">Cringe Score: {averageScore}</h2>
        <p className="post-text">{textPreview ? textPreview + "..." : ""}</p>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
