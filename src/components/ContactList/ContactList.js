import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={Styles.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={Styles.li}>
            <span>
              {name}: {number}
            </span>
            <button
              type="button"
              onClick={() => onDeleteContact(id)}
              className={Styles.button}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;