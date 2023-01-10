import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';

function App() {
  return (
    <div className="container">
      <HomePage />
      {/* <SignUpPage /> */}
      <LanguageSelector />
    </div>
  );
}

export default App;
