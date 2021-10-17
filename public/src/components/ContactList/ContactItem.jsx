import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { contactsOperations } from "redux/contacts";

import styles from "./ContactList.module.scss";

const ContactItem = ({ contact }) => {
  const { id, name, number } = contact;

  const dispatch = useDispatch();
  const onDeleteContact = () => dispatch(contactsOperations.deleteContact(id));

  return (
    <li className={styles.ContactItem}>
      <span>
        {name}:
        <a
          className={styles.phoneNumber}
          href={"tel:" + number}
          aria-label="Call"
        >
          {number}
        </a>
      </span>
      <button className={styles.contactBtn} onClick={onDeleteContact}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
