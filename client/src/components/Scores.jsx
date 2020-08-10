import React, { useState } from "react";
import PropTypes from "prop-types";
import { addScore } from "../actions/post-action";
import { connect } from "react-redux";

const Scores = ({ auth, post, postId, addScore }) => {
  if (!auth.loading && auth.user) {
    const currentUsersScore = post.score.filter((scr) => {
      return scr.user === auth.user._id;
    });
    console.log("currentUsersScore:", currentUsersScore[0].val);
  }

  console.log("POST:", post);
  const [userScore, setUserScore] = useState(
    !auth.loading && auth.user
      ? post.score.filter((scr) => {
          return scr.user === auth.user._id;
        })[0].val
      : 5
  );
  //   const [userScore, setUserScore] = useState(
  //     !auth.loading && auth.user ? "LOGGED IN " + auth.user._id : null
  //   );

  console.log("USER SCORE:", userScore);

  const scoreChange = (e) => {
    setUserScore(e.target.value);
    addScore(postId, userScore);
  };
  return (
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
          onChange={(e) => scoreChange(e)}
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
