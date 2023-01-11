import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';

function App() {
  return (
    <div className="container">
      {window.location.pathname === '/' && <HomePage />}
      {window.location.pathname === '/signup' && <SignUpPage />}
      {window.location.pathname === '/login' && <LoginPage />}
      {window.location.pathname === '/user/1' && <UserPage />}
      <LanguageSelector />
    </div>
  );
}

export default App;
