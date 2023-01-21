import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

function AuthContextWrapper(props) {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    id: ''
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: auth.isLoggedIn,
        id: auth.id,
        onLoginSuccess: setAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

AuthContextWrapper.propTypes = {
  children: PropTypes.element
};

export default AuthContextWrapper;
