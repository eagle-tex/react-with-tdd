const reducer = (state, action) => {
  if (action.type === 'login-success') {
    // WARN: do a DEEP COPY of the state object if state has
    //   nested object(s). Here, as it does not, a simple copy is OK
    const newState = { ...state };
    newState.id = action.payload.id;
    newState.isLoggedIn = true;

    return newState;
  }
  return state;
};

export default reducer;
