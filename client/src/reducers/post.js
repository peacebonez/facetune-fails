import {
  GET_POSTS,
  GET_ONE_POST,
  GET_MORE_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  ADD_SCORE,
  ADD_COMMENT,
  DELETE_COMMENT,
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
    case ADD_SCORE:
      return {
        ...state,
        post: { ...state.post, score: payload },
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
        ...state.post,
        comments: state.post.comments.filter(
          (comment) => comment._id !== payload
        ),
      };
    default:
      return state;
  }
}
