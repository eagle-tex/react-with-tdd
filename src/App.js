import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import AccountActivationPage from './pages/AccountActivationPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';
import logo from './assets/hoaxify.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { t } = useTranslation();

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light shadow">
        <div className="container">
          <Link className="navbar-brand" to="/" title="Home">
            <img src={logo} alt="Hoaxify" width="60" />
            Hoaxify
          </Link>
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <>
                <Link className="nav-link" to="/signup" title={t('signUp')}>
                  {t('signUp')}
                </Link>
                <Link className="nav-link" to="/login" title="Login">
                  Login
                </Link>
              </>
            )}
            <Link className="nav-link" to="/login" title="Login">
              My Profile
            </Link>
          </ul>
        </div>
      </nav>
      <div className="container pt-3">
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route
          path="/login"
          render={reactRouterProps => {
            return (
              <LoginPage
                {...reactRouterProps}
                onLoginSuccess={() => setLoggedIn(true)}
              />
            );
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
