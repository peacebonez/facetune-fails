import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";

//root reducer

export default combineReducers({
  auth,
  post,
});
