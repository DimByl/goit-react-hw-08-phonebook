import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  changeFilter,
} from "./contacts-actions";

import { logoutSuccess } from "../auth/auth-actions";

const itemsReducer = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [payload, ...state],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [logoutSuccess]: () => [],
});

const filterReducer = createReducer("", {
  [changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
});

const error = createReducer(null, {
  [fetchContactsError]: (_, { payload }) => payload,
  [fetchContactsRequest]: () => null,
  [addContactError]: (_, { payload }) => payload,
  [addContactRequest]: () => null,
  [deleteContactError]: (_, { payload }) => payload,
  [deleteContactRequest]: () => null,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading,
  error,
});
