import axios from "axios";
import {
  GET_POSTS,
  GET_MORE_POSTS,
  GET_ONE_POST,
  GET_TOP_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  ADD_SCORE,
  ADD_COMMENT,
  ADD_SUBCOMMENT,
  DELETE_COMMENT,
  DELETE_SUBCOMMENT,
  UPDATE_HEARTS,
  UPDATE_SUBHEARTS,
} from "./types";

import { setAlert } from "./alert-action";
import { set } from "mongoose";

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
export const getTopPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/posts/top-posts");

    dispatch({ type: GET_TOP_POSTS, payload: res.data });
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

export const addPost = (formInfo) => async (dispatch) => {
  try {
    const res = await axios.post("/posts/new-post", formInfo, config);
    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert("Post created!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Blog Post Failed", status: err.status },
    });
  }
};

//Update a post (ADMIN PRIVILEGES)

export const updatePost = (formInfo, postId) => async (dispatch) => {
  console.log("postId:", postId);
  console.log("formInfo:", formInfo);
  try {
    const res = await axios.put(`/posts/edit-post/${postId}`, formInfo, config);

    dispatch({ type: UPDATE_POST, payload: res.data });
    dispatch(setAlert("Post updated!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Blog Post Edit Failed", status: err.status },
    });
  }
};

//Delete a post (ADMIN PRIVILEGES)

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);

    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert("Post deleted!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Post could not be deleted", status: 400 },
    });
  }
};

//Add a comment (Private)

export const addComment = (postId, formInfo) => async (dispatch) => {
  try {
    //posting the formData that will be passed from the front end
    const res = await axios.post(`/posts/comment/${postId}`, formInfo, config);

    dispatch({ type: ADD_COMMENT, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Server Error @ POST a comment", status: 500 },
    });
  }
};

//Add a sub-comment (Private)

export const addSubComment = (postId, commentId, formInfo) => async (
  dispatch
) => {
  try {
    //posting the formData that will be passed from the front end
    const res = await axios.post(
      `/posts/${postId}/comment/${commentId}`,
      formInfo,
      config
    );

    //payload is the comment object that was sub-comment on
    dispatch({ type: ADD_SUBCOMMENT, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Server Error @ POST a sub-comment", status: 500 },
    });
  }
};

//Delete a comment (Private)

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({ type: DELETE_COMMENT, payload: commentId });
    // dispatch(setAlert("Comment deleted", "danger"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Reply could not be deleted", status: 400 },
    });
  }
};

//Delete a sub-comment (Private)

export const deleteSubComment = (postId, commentId, subCommentId) => async (
  dispatch
) => {
  try {
    await axios.delete(`/posts/comment/${postId}/${commentId}/${subCommentId}`);

    alert("Reply Deleted!");
    dispatch({ type: DELETE_SUBCOMMENT, payload: { commentId, subCommentId } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Reply could not be deleted", status: 400 },
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
      payload: { msg: "Heart could not updated", status: 400 },
    });
  }
};

//update a sub-heart
export const updateSubHeart = (postId, commentId, subCommentId) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `/posts/comment/heart/${postId}/${commentId}/${subCommentId}`
    );
    dispatch({
      type: UPDATE_SUBHEARTS,
      payload: { postId, commentId, subCommentId, subHearts: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Heart could not updated", status: 400 },
    });
  }
};

export const addScore = (postId, userScore) => async (dispatch) => {
  userScore = parseInt(userScore);
  try {
    const res = await axios.post(
      `/posts/score/${postId}`,
      { userScore },
      config
    );
    dispatch({
      type: ADD_SCORE,
      payload: { score: [{ val: userScore, user: res.data[0].user }] },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Score could not updated", status: 400 },
    });
  }
};
