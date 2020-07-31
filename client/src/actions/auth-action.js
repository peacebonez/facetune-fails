import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { set } from "mongoose";

//load a user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register a user

export const register = ({ name, email, password }) => async (dispatch) => {
  //create a config with header and body
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/users", body, config);
    console.log("REGISTER USER RES", res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    //TO DO: set up proper alerts
    alert(err);

    dispatch({ type: REGISTER_FAIL });
  }
};
