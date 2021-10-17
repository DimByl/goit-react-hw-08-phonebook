import styles from "./App.scss";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import Container from "./components/Container/Container";

const App = () => (
  <div className={styles.App}>
    <Container>
      <h1 className={styles.title}>Phonebook (hook)</h1>
      <ContactForm />

      <h2 className={styles.titleContacts}>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  </div>
);

export default App;
