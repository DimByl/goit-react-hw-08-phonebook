import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import authActions from "./auth-actions";

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [authActions.signupSuccess]: (_, { payload }) => payload.user,
  [authActions.loginSuccess]: (_, { payload }) => payload.user,
  [authActions.logoutSuccess]: () => initialUserState,
  [authActions.logoutError]: () => initialUserState,
  [authActions.getCurrentUserDataSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  [authActions.signupSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
});

const isAuthorized = createReducer(false, {
  [authActions.signupSuccess]: () => true,
  [authActions.loginSuccess]: () => true,
  [authActions.getCurrentUserDataSuccess]: () => true,

  [authActions.signupError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserDataError]: () => false,
  [authActions.logoutRequest]: () => false,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.signupError]: setError,
  [authActions.signupRequest]: () => null,
  [authActions.loginError]: setError,
  [authActions.loginRequest]: () => null,
  [authActions.logoutError]: setError,
  [authActions.logoutRequest]: () => null,
  [authActions.getCurrentUserDataError]: setError,
  [authActions.getCurrentUserDataRequest]: () => null,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
  error,
});
