import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import AccountActivationPage from './pages/AccountActivationPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, createContext } from 'react';

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    id: ''
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: auth.isLoggedIn,
        id: auth.id,
        onLoginSuccess: setAuth
      }}
    >
      <Router>
        <NavBar />
        <div className="container pt-3">
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user/:id" component={UserPage} />
          <Route path="/activate/:token" component={AccountActivationPage} />
          <LanguageSelector />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
