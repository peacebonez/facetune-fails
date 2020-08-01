import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getOnePost } from "../actions/post-action";

//user is auth through connect

const Post = ({
  post: { title, name, date, imageURL, score, text, _id },
  getOnePost,
}) => {
  let { id } = useParams();
  // const linkToPost = `${_id.substr(_id.length - 5, _id.length - 1)}-${title}`;
  // const openPost = (e) => {
  //   getOnePost(match.params.id)
  // };
  return (
    <li className="post">
      <div className="post-body">
        <Link to={`/${_id}`} onClick={() => getOnePost(id)}>
          <h3 className="post-header">{title}</h3>
        </Link>
        <p className="post-details">
          {name} · <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        <Link to={`/${_id}`}>
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

export default connect(null, { getOnePost })(Post);
