import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';
import logo from './assets/hoaxify.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const { t } = useTranslation();

  const [random, setRandom] = useState(10);

  const generateRandom = () => {
    setRandom(Math.random() * 100);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light shadow">
        <div className="container">
          <Link className="navbar-brand" to="/" title="Home">
            <img src={logo} alt="Hoaxify" width="60" />
            Hoaxify
          </Link>
          <ul className="navbar-nav">
            <Link className="nav-link" to="/signup" title={t('signUp')}>
              {t('signUp')}
            </Link>
            <Link className="nav-link" to="/login" title="Login">
              Login
            </Link>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route path="/signup">
          <SignUpPage random={random} />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:id" component={UserPage} />
        <LanguageSelector />
      </div>
      <button onClick={generateRandom}>Generate Random</button>
    </Router>
  );
}

export default App;
