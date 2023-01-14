import PropTypes from 'prop-types';

const Alert = props => {
  let classForAlert = `alert alert-${props.type}`;
  if (props.center) {
    classForAlert += ' text-center';
  }
  return (
    <div className={classForAlert}>
      {props.text}
      {props.children}
    </div>
  );
};

Alert.defaultProps = {
  type: 'success'
};

Alert.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.element,
  center: PropTypes.bool
};

export default Alert;
