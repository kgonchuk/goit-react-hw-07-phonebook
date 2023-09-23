import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selector';
import { selectContacts } from '../redux/contact/selector';
import { deleteContact } from '../redux/operations';

const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  const normalizeFilter = filter.toLowerCase();
  const filteredContatcs = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <ul className={css.contactList}>
      {filteredContatcs.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          {name}: {number}
          <button
            className={css.contactListBtn}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
      {filteredContatcs.length === 0 && (
        <p>The Phonebook is empty. Add your first contact. 🫤 </p>
      )}
    </ul>
  );
};
export default ContactList;
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
