import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={Styles.label}>
      Find contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={Styles.input}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;