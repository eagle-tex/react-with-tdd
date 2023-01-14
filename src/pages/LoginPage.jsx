import { useEffect } from 'react';
import PropTypes from 'prop-types';

const LoginPage = props => {
  useEffect(() => {
    console.log(`new random: ${props.random}`);
  }, [props.random]);

  return (
    <div data-testid="login-page">
      <h1>Login Page</h1>
    </div>
  );
};

LoginPage.propTypes = {
  random: PropTypes.number
};

export default LoginPage;
