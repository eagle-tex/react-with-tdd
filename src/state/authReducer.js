const reducer = (state, action) => {
  if (action.type === 'login-success') {
    // WARN: do a DEEP COPY of the state object if state has
    //   nested object(s). Here, as it does not, a simple copy is OK
    return { ...state, ...action.payload, isLoggedIn: true };
  }

  return state;
};

export default reducer;
