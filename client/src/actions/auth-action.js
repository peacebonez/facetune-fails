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
  EDIT_USER,
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert-action";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//load a user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/auth");
    // console.log("Current User Data:", res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
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

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    //TO DO: set up proper alerts
    const errors = err.response.data.errors;
    console.log("errors:", errors);
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({ type: REGISTER_FAIL });
  }
};

//login a user

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("errors:", errors);
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: LOGIN_FAIL,
    });
    throw err;
  }
};

export const editUser = (formInfo) => async (dispatch) => {
  try {
    const res = await axios.put("/users/profile", formInfo, config);
    dispatch({ type: EDIT_USER, payload: res.data });
    dispatch(setAlert("Profile updated!", "success"));
  } catch (err) {
    dispatch({ type: USER_LOADED });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
  window.location.reload();
};
