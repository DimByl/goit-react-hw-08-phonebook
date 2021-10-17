import { useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PhoneInput from 'react-phone-number-input';
import swal from 'sweetalert';

import Modal from '../Modal';

import contactsOperations from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';

import styles from './ContactItem.module.scss';

const ContactItem = ({ contact }) => {
  const { id, name, number } = contact;

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedNumber, setUpdatedNumber] = useState(number);
  const [showModal, setShowModal] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [contactsToCheck, setContactsToCheck] = useState(null);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onDeleteContact = () => dispatch(contactsOperations.deleteContact(id));

  const handleShowModal = () => {
    const filteredContacts = contacts.filter(
      ({ name }) => name !== updatedName,
    );
    setContactsToCheck(filteredContacts);

    setShowModal(true);
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setUpdatedName(value);
        break;

      case 'favorite':
        setFavorite(!favorite);

        if (!favorite) {
          swal(`If you like me, call me (◕‿◕)♡! ${value}`);
        }
        break;

      default:
        return;
    }
  };

  const handleUpdateContact = event => {
    event.preventDefault();

    if (name === updatedName && number === updatedNumber) {
      handleCloseModal();
      return;
    }

    const checkSameName = contactsToCheck.find(
      ({ name }) => name === updatedName,
    );

    const checkSameNumber = contactsToCheck.find(
      ({ number }) => number === updatedNumber,
    );

    if (checkSameNumber) {
      swal({
        title: 'This number already exists!',
        text: `${checkSameNumber.name}: ${checkSameNumber.number}`,
        icon: 'info',
      });

      setUpdatedName(name);
      setUpdatedNumber(number);
      handleCloseModal();
      return;
    }

    if (checkSameName) {
      swal({
        title: `${checkSameName.name}`,
        text: 'is already in contacts!',
        icon: 'info',
      });

      setUpdatedName(name);
      setUpdatedNumber(number);
      handleCloseModal();
      return;
    }

    const updatedContact = {
      name: updatedName,
      number: updatedNumber,
    };

    dispatch(contactsOperations.updateContact({ id, updatedContact }));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <form
            className={styles.ContactUpdateItem}
            onSubmit={handleUpdateContact}
          >
            <label className={styles.formLabel}>
              <span className={styles.formText}>Name</span>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                value={updatedName}
                onChange={handleChange}
                autoComplete="off"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
                required
              />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formText}>Number</span>
              <PhoneInput
                value={updatedNumber}
                onChange={setUpdatedNumber}
                defaultCountry="UA"
                international
                autoComplete="off"
                pattern="((\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?)"
                title="Phone number must be 10-14 digits long, can contain digits and can start with +"
                required
              />
            </label>
            <button className={styles.contactBtnSave} type="submit">
              <span className={styles.btnText}>Save</span>
              <SaveTwoToneIcon />
            </button>
          </form>
        </Modal>
      )}

      <li className={styles.ContactItem}>
        <label>
          <div className={styles.favoriteWrap}>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="favorite"
              value={name}
              onChange={handleChange}
              size="small"
            />
            <span className={styles.contactName}>{name}:</span>
          </div>

          <a
            className={styles.phoneNumber}
            href={'tel:' + number}
            aria-label="Call"
          >
            {number}
          </a>
        </label>

        <div>
          <button
            className={styles.contactBtn}
            onClick={handleShowModal}
            title="Update contact"
          >
            <EditTwoToneIcon />
          </button>
          <button
            className={styles.contactBtn}
            onClick={onDeleteContact}
            title="Delete contact"
          >
            <DeleteForeverTwoToneIcon />
          </button>
        </div>
      </li>
    </>
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