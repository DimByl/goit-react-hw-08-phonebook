import { useSelector } from "react-redux";
import { contactsSelectors } from "redux/contacts";
import ContactItem from "./ContactItem";
import styles from "./ContactList.module.scss";

const ContactList = () => {
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
