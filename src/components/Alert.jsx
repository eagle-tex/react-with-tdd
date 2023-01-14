import PropTypes from 'prop-types';

const Alert = props => {
  const classForAlert = `alert alert-${props.type}`;
  return <div className={classForAlert}>{props.text}</div>;
};

Alert.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string
};

export default Alert;
