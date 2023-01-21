import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import AccountActivationPage from './pages/AccountActivationPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <div className="container pt-3">
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/activate/:token" component={AccountActivationPage} />
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
