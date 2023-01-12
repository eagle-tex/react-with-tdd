import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function App() {
  const { t } = useTranslation();

  const [path, setPath] = useState(window.location.pathname);

  const onClickLink = event => {
    event.preventDefault();
    const linkPath = event.target.attributes.href.value;
    window.history.pushState({}, '', linkPath);
    setPath(linkPath);
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow">
        <div className="container">
          <a
            className="navbar-brand"
            href="/"
            onClick={onClickLink}
            title="Home"
          >
            Hoaxify
          </a>
          <ul className="navbar-nav">
            <a
              className="nav-link"
              href="/signup"
              onClick={onClickLink}
              title={t('signUp')}
            >
              {t('signUp')}
            </a>
            <a
              className="nav-link"
              href="/login"
              onClick={onClickLink}
              title="Login"
            >
              Login
            </a>
          </ul>
        </div>
      </nav>
      <div className="container">
        {path === '/' && <HomePage />}
        {path === '/signup' && <SignUpPage />}
        {path === '/login' && <LoginPage />}
        {path.startsWith('/user') && <UserPage />}
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
