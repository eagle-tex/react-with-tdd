export const loginSuccess = payload => {
  return {
    type: 'login-success',
    payload
  };
};

export const updateSuccess = payload => {
  return {
    type: 'user-update-success',
    payload
  };
};

export const logoutSuccess = () => {
  return {
    type: 'logout-success'
  };
};
