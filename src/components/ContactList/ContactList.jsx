import { useSelector } from 'react-redux';

import {
  getContacts,
  getContactsToShow,
} from '../../redux/contacts/contacts-selectors';

import Notification from '../Notification';
import ContactItem from '../ContactItem';
import styles from './ContactList.module.scss';

const ContactList = () => {
  const allContacts = useSelector(getContacts);
  const contacts = useSelector(getContactsToShow);

  return allContacts.length > 0 ? (
    <ul className={styles.ContactList}>
      {contacts.map(contact => {
        const { id } = contact;

        return <ContactItem key={id} contact={contact} />;
      })}
    </ul>
  ) : (
    <Notification message="Contact book is empty" />
  );
};

export default ContactList;
