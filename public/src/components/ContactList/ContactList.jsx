import { useSelector, useDispatch } from "react-redux";
import { contactsSelectors } from "redux/contacts";
import ContactItem from "./ContactItem";
import styles from "./ContactList.module.scss";
import { useEffect } from "react";
import { fetchContacts } from "redux/contacts/contacts-operations";

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const allContacts = useSelector(contactsSelectors.getContacts);
  const contacts = useSelector(contactsSelectors.getContactsToShow);

  return allContacts.length === 0 ? (
    <p className={styles.notification}>Contact book is empty</p>
  ) : (
    <ul className={styles.ContactList}>
      {contacts.map((contact) => {
        const { id } = contact;

        return <ContactItem key={id} contact={contact} />;
      })}
    </ul>
  );
};

export default ContactList;
