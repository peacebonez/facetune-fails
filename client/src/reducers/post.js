import {
  GET_POSTS,
  GET_ONE_POST,
  GET_MORE_POSTS,
  GET_TOP_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  ADD_SCORE,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_HEARTS,
} from "../actions/types";

// actions functions send their payloads to the reducers!

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
    case GET_MORE_POSTS:
    case GET_TOP_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_ONE_POST:
      return { ...state, post: payload, loading: false };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    case UPDATE_HEARTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? { ...post, hearts: payload.hearts } : post
        ),
        loading: false,
      };
    case ADD_SCORE:
      return {
        ...state,
        post: { ...state.post, score: payload.score },
        loading: false,
      };
    default:
      return state;
  }
}
