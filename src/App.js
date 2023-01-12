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
    <div className="container">
      <div>
        <a href="/" title="Home">
          Hoaxify
        </a>
        <a href="/signup" onClick={onClickLink} title={t('signUp')}>
          {t('signUp')}
        </a>
      </div>
      {path === '/' && <HomePage />}
      {path === '/signup' && <SignUpPage />}
      {path === '/login' && <LoginPage />}
      {path.startsWith('/user') && <UserPage />}
      <LanguageSelector />
    </div>
  );
}

export default App;
