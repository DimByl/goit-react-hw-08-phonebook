import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import Filter from '../../components/Filter';
import Container from '../../components/Container';
import Loader from '../../components/Loader/Loader';

import contactsOperations from '../../redux/contacts/contacts-operations';
import {
  getLoadingContacts,
} from '../../redux/contacts/contacts-selectors';

import styles from './UserPage.module.scss';

const UserPage = () => {
  const isLoadingContacts = useSelector(getLoadingContacts);

  const dispatch = useDispatch();
  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  return (
    <div className={styles.UserPage}>
      <Container>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm />

        <h2 className={styles.titleContacts}>Contacts</h2>
        <Filter />

        {isLoadingContacts && <Loader />}

        <ContactList />
      </Container>
    </div>
  );
};

export default UserPage;