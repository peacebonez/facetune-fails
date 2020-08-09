import axios from "axios";
import {
  GET_POSTS,
  GET_MORE_POSTS,
  GET_ONE_POST,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  ADD_SCORE,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_HEARTS,
} from "./types";

//Axios receives the information sent from the backend and we can send that to the front end

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

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
export const getMorePosts = (pageNum) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/page-${pageNum}`);

    dispatch({ type: GET_MORE_POSTS, payload: res.data });
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

//Add a post (ADMIN PRIVILEGES)

export const addPost = (formInfo) => async (dispatch) => {
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

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);

    dispatch({ type: DELETE_POST, payload: postId });
    alert("Post Deleted!");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Post not deleted", status: 400 },
    });
  }
};

//Add a comment (Private)

export const addComment = (postId, formInfo) => async (dispatch) => {
  try {
    //posting the formData that will be passed from the front end
    const res = await axios.post(`/posts/comment/${postId}`, formInfo, config);

    dispatch({ type: ADD_COMMENT, payload: res.data });
    alert("Comment Added!");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Server Error @ POST a comment", status: 500 },
    });
  }
};

//Delete a comment (Private)

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({ type: DELETE_COMMENT, payload: commentId });
    alert("Comment Deleted!");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Comment not deleted", status: 400 },
    });
  }
};

//update a heart

export const updateHeart = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(`/posts/comment/heart/${postId}/${commentId}`);
    dispatch({
      type: UPDATE_HEARTS,
      payload: { postId, commentId, hearts: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Heart not updated", status: 400 },
    });
  }
};

export const addScore = (postId, score) => async (dispatch) => {
  try {
    const res = await axios.put(`/posts/${postId}`);
    dispatch({ type: ADD_SCORE, payload: { postId, score: res.data } });
  } catch (err) {}
};
