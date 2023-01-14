import PropTypes from 'prop-types';

const Spinner = props => {
  let spanClass = 'spinner-border';
  if (props.size !== 'big') {
    spanClass += ' spinner-border-sm';
  }

  return <span className={spanClass} role="status"></span>;
};

Spinner.propTypes = {
  size: PropTypes.string
};

export default Spinner;
