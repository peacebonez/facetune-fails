import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addScore } from "../actions/post-action";
import { connect } from "react-redux";
import { determineScore } from "./Post";

const Scores = ({ auth, post, postId, addScore }) => {
  console.log("POST:", post);
  const allUsers = post.score.map((scr) => scr.user);

  //If loading is done, we have a user, AND they have already submitted a score we can preload their score.
  //Otherwise default to 5
  const [userScore, setUserScore] = useState(
    !auth.loading && auth.user && allUsers.includes(auth.user._id)
      ? post.score.find((scr) => scr.user === auth.user._id).val
      : 5
  );

  //Checks the radio button of the user's score upon page load
  useEffect(() => {
    document.getElementById(`score${userScore}`).setAttribute("checked", true);
  }, [userScore]);

  return (
    <div className="score-container">
      <h3 className="post-header-open">Cringe Score: {post.averageScore}</h3>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="score"
          id="score1"
          value="1"
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score1">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score2">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score3">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score4">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score5">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score6">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score7">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score8">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score9">
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
          onChange={(e) => {
            setUserScore(e.target.value);
            addScore(postId, e.target.value);
          }}
        />
        <label className="form-check-label" htmlFor="score10">
          10
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Scores.propTypes = {
  post: PropTypes.object,
  addScore: PropTypes.func,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { addScore })(Scores);
