import axios from "axios";

import {
  GET_POSTS,
  GET_ONE_POST,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

//Get all posts

export const getPosts = () => async (dispatch) => {
  console.log("GET POSTS IS RUNNING");
  try {
    const res = await axios.get("/posts");

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get a post

//Put a score

//Add a post (ADMIN PRIVILEGES)

//Delete a post (ADMIN PRIVILEGES)

//Add a comment (Private)

//Delete a comment (Private)
