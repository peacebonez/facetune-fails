import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

// let testArr = [
//   { val: 10, user: "asd123" },
//   { val: 20, user: "a23d123" },
//   { val: 130, user: "a124d123" },
// ];

// let calcAverage = (arr) => {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i].val;
//   }
//   return Math.round(sum / arr.length);
// };

const Post = ({ post: { title, name, date, imageURL, score, text, _id } }) => {
  const determineScore = () => {};

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
        <h2>Rating: {score.val}</h2>
        <p className="post-text">{text}</p>
      </div>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
