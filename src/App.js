import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import AccountActivationPage from './pages/AccountActivationPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    id: ''
  });

  return (
    <Router>
      <NavBar auth={auth} />
      <div className="container pt-3">
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route
          path="/login"
          render={reactRouterProps => {
            return <LoginPage {...reactRouterProps} onLoginSuccess={setAuth} />;
          }}
        />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/activate/:token" component={AccountActivationPage} />
        <LanguageSelector />
      </div>
    </Router>
  );
}

export default App;
