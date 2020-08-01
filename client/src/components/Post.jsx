import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

//user is auth through connect

const Post = ({ post: { title, name, date, imageURL, score, text, _id } }) => {
  // const linkToPost = `${_id.substr(_id.length - 5, _id.length - 1)}-${title}`;
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
        <h2>Rating: {score}</h2>
        <p className="post-text">{text}</p>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
