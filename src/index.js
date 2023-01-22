import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './locale/i18n';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// NOTE: reducer is a function
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

const initialState = {
  isLoggedIn: false,
  id: 25
};

// NOTE: store is a object required by Provider
//   and is created by createStore(reducer)
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
