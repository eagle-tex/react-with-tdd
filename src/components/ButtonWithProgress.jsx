// import React from 'react'
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const ButtonWithProgress = props => {
  const { disabled, apiProgress, onClick } = props;

  return (
    <button
      className="btn btn-primary"
      disabled={disabled || apiProgress}
      onClick={onClick}
    >
      {apiProgress && <Spinner />}
      {props.children}
    </button>
  );
};

ButtonWithProgress.propTypes = {
  disabled: PropTypes.bool,
  apiProgress: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default ButtonWithProgress;
