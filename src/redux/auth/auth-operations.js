import axios from "axios";
import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserDataRequest,
  getCurrentUserDataSuccess,
  getCurrentUserDataError,
} from "./auth-actions";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const signUp = (payload) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const { data } = await axios.post("/users/signup", payload);

    dispatch(signupSuccess(data));
    token.set(data.token);

    return data;
  } catch (error) {
    dispatch(signupError(error.message));
  }
};

const logIn = (payload) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const { data } = await axios.post("/users/login", payload);

    dispatch(loginSuccess(data));
    token.set(data.token);

    return data;
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logOut = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    await axios.post(`/users/logout`);

    dispatch(logoutSuccess());
    token.unset();
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

const getCurrentUserData = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) return;

  token.set(persistedToken);
  dispatch(getCurrentUserDataRequest());

  try {
    const { data } = await axios.get("/users/current");
    dispatch(getCurrentUserDataSuccess(data));

    return data;
  } catch (error) {
    dispatch(getCurrentUserDataError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  signUp,
  logIn,
  logOut,
  getCurrentUserData,
};
