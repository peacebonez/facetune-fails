import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostOpen = (props) => {
  return (
    <li className="post-open">
      <div className="post-body post-body-open">
        <h3 className="post-header post-header-open">Title</h3>
        <p className="post-details post-details-open">
          Kevin Pariso · 08/22/2017
        </p>
        <img
          className="post-img post-img-open"
          src="https://images.gawker.com/feageomtd6muf2zslnw1/c_scale,fl_progressive,q_80,w_800.png"
        ></img>
        <p className="post-text post-text-open">
          Junge mit du nun schnee du vaterland, weiter es brust trübhell
          niedlich ferne es geschaut ort ort, einz'ges deiner dann ruft oft gehn
          teuren glück gartens, wiedersehn vom gefärbt du.
        </p>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="score"
            id="score1"
            value="1"
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
          />
          <label className="form-check-label" for="score10">
            10
          </label>
        </div>
      </div>
    </li>
  );
};

PostOpen.propTypes = {};

export default PostOpen;
