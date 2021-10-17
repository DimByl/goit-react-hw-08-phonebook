import axios from "axios";
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
} from "./contacts-actions";

axios.defaults.baseURL = "http://localhost:3232";

export const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactsRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch((error) => dispatch(fetchContactsError(error.massage)));
};

export const addContact =
  ({ name, number }) =>
  (dispatch) => {
    if (!name || !number) return;
    const contact = { name, number };
    dispatch(addContactRequest());

    axios
      .post("/contacts", contact)
      .then(({ data }) => dispatch(addContactSuccess(data)))
      .catch((error) => dispatch(addContactError(error.massage)));
  };

export const deleteContact = (contactId) => (dispatch) => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch((error) => dispatch(deleteContactError(error.massage)));
};
//   dispatch(fetchContactsRequest());
// const fetchContacts = () => async dispatch => {

//   try {
//     const { data } = await axios.get('/contacts');
//     dispatch(fetchContactsSuccess(data));

//     return data;
//   } catch (error) {
//     dispatch(fetchContactsError(error.message));
//   }
// };

// const addContact = (name, number) => async dispatch => {
//   const contact = { name, number };
//   dispatch(addContactRequest());

//   try {
//     const { data } = await axios.post('/contacts', contact);
//     dispatch(addContactSuccess(data));

//     return data;
//   } catch (error) {
//     dispatch(addContactError(error.message));
//   }
// };

// const deleteContact = contactId => async dispatch => {
//   dispatch(deleteContactRequest());

//   try {
//     const { data } = await axios.delete(`/contacts/${contactId}`);
//     dispatch(deleteContactSuccess(contactId));

//     return data;
//   } catch (error) {
//     dispatch(deleteContactError(error.message));
//   }
// };

// /* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
// export default {
//   fetchContacts,
//   addContact,
//   deleteContact,
// };
