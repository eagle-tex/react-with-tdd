import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './locale/i18n';
import AuthContextWrapper from './state/AuthContextWrapper';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// NOTE: reducer is a function
const reducer = () => {};

// NOTE: store is a object required by Provider
//   and is created by createStore(reducer)
const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextWrapper>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthContextWrapper>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
