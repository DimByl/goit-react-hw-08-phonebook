import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PhoneInput from "react-phone-number-input";

import { contactsOperations } from "redux/contacts";
import { getContacts } from "redux/contacts";
import styles from "./ContactForm.module.scss";
import "react-phone-number-input/style.css";

const ContactForm = () => {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      setContactName(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const checkSameName = contacts.find(({ name }) => name === contactName);

    const checkSameNumber = contacts.find(
      ({ number }) => number === contactNumber
    );

    if (checkSameNumber) {
      const { name, number } = checkSameNumber;
      alert(`This number already exists: ${name}: ${number}`);
      return;
    }

    if (checkSameName) {
      alert(`${contactName} is already in contacts`);
      return;
    }

    dispatch(contactsOperations.addContact(contactName, contactNumber));
    reset();
  };

  const reset = () => {
    setContactName("");
    setContactNumber("");
  };

  return (
    <form className={styles.ContactForm} onSubmit={handleFormSubmit}>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Name</span>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter contact's name"
          name="name"
          value={contactName}
          onChange={handleChange}
          autoComplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Number</span>
        <PhoneInput
          value={contactNumber}
          onChange={setContactNumber}
          defaultCountry="UA"
          international
          autoComplete="off"
          pattern="((\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?)"
          title="Номер телефона должен состоять из 10-14 цифр, может содержать цифры и может начинаться с +"
          required
        />
      </label>

      <button className={styles.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
