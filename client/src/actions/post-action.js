import axios from "axios";

import {
  GET_POSTS,
  GET_ONE_POST,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  CHANGE_SCORE,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

//Get all posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/posts");

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Server Error on retrieving posts", status: 500 },
    });
  }
};

//Get a post

export const getOnePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postId}`);
    dispatch({ type: GET_ONE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Post not found", status: 400 },
    });
  }
};

//Put a score

export const addScore = (score) => async (dispatch) => {
  try {
    const res = await axios.put("/post/:id");
  } catch (err) {}
};

//Add a post (ADMIN PRIVILEGES)

export const addPost = (formInfo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/posts/new-post", formInfo, config);
    dispatch({ type: ADD_POST, payload: res.data });
    alert("Post Created!");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Blog Post Failed", status: err.status },
    });
  }
};

//Delete a post (ADMIN PRIVILEGES)

//Add a comment (Private)

//Delete a comment (Private)
