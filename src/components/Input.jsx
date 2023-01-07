import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  const { id, label, onChange, help } = props;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id="username"
        className="form-control is-invalid"
        onChange={onChange}
      />
      <span className="invalid-feedback">{help}</span>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  help: PropTypes.string
};

export default Input;
