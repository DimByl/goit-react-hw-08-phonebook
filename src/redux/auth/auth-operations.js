import axios from "axios";
import authActions from "./auth-actions";

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
  dispatch(authActions.signupRequest());

  try {
    const response = await axios.post("/users/signup", payload);

    dispatch(authActions.signupSuccess(response.data));
    token.set(response.data.token);
  } catch (error) {
    alert(
      "Check you entered incorrect data. Check your name, login and password"
    );
    dispatch(authActions.signupError(error.message));
  }
};

const logIn = (payload) => async (dispatch) => {
  dispatch(authActions.loginRequest());

  try {
    const response = await axios.post("/users/login", payload);

    dispatch(authActions.loginSuccess(response.data));
    token.set(response.data.token);
  } catch (error) {
    alert("Check you entered incorrect data, check your login and password");
    dispatch(authActions.loginError(error.message));
  }
};

const logOut = () => async (dispatch) => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post(`/users/logout`);

    dispatch(authActions.logoutSuccess());
    token.unset();
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

const getCurrentUserData = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) return;

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserDataRequest());

  try {
    const response = await axios.get("/users/current");
    dispatch(authActions.getCurrentUserDataSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserDataError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  signUp,
  logIn,
  logOut,
  getCurrentUserData,
};
