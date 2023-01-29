import { AUTH } from './constants';

const reducer = (state, action) => {
  if (action.type === AUTH.LOGIN_SUCCESS) {
    // WARN: do a DEEP COPY of the state object if state has
    //   nested object(s). Here, as it does not, a simple copy is OK
    return { ...state, ...action.payload, isLoggedIn: true };
  } else if (action.type === AUTH.USER_UPDATE_SUCCESS) {
    return {
      ...state,
      username: action.payload.username
    };
  } else if (action.type === AUTH.LOGOUT_SUCCESS) {
    return {
      isLoggedIn: false
    };
  }

  return state;
};

export default reducer;
