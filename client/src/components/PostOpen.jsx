import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getOnePost } from "../actions/post-action";
import Moment from "react-moment";

import Loading from "../components/Loading";

const PostOpen = ({ getOnePost, post: { post, loading } }) => {
  const [userScore, setUserScore] = useState(5);
  let { id } = useParams();
  useEffect(() => {
    getOnePost(id);
    console.log("UserScore:", userScore);
  }, [getOnePost, userScore]);
  const scoreChange = (e) => {
    setUserScore(e.target.value);
  };
  return loading || post === null ? (
    <Loading type="spokes" />
  ) : (
    <div className="post-body post-body-open">
      <h3 className="post-header post-header-open">{post.title}</h3>
      <p className="post-details post-details-open">
        {post.name} · <Moment format="MM/DD/YYYY">{post.date}</Moment>
      </p>
      <img className="post-img post-img-open" src={post.imageURL}></img>
      <p className="post-text post-text-open">{post.text}</p>
      <div className="score-container">
        <h3 className="post-header-open">Cringe Score</h3>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score1"
            value="1"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score1">
            1
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score2"
            value="2"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score2">
            2
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score3"
            value="3"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score3">
            3
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score4"
            value="4"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score4">
            4
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score5"
            value="5"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score5">
            5
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score6"
            value="6"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score6">
            6
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score7"
            value="7"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score7">
            7
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score8"
            value="8"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score8">
            8
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score9"
            value="9"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score9">
            9
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score10"
            value="10"
            onChange={(e) => scoreChange(e)}
          />
          <label className="form-check-label" for="score10">
            10
          </label>
        </div>
      </div>
    </div>
  );
};

PostOpen.propTypes = {
  post: PropTypes.object,
};

const mapStateToProps = (state) => {
  console.log("STATE POST FROM REDUCER:", state.post);
  return { post: state.post };
};

export default connect(mapStateToProps, { getOnePost })(PostOpen);
