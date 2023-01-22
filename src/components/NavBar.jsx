import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/hoaxify.png';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useSelector(store => store);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light shadow">
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          <img src={logo} alt="Hoaxify" width="60" />
          Hoaxify
        </Link>
        <ul className="navbar-nav">
          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link" to="/signup" title={t('signUp')}>
                {t('signUp')}
              </Link>
              <Link className="nav-link" to="/login" title="Login">
                {t('login')}
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <Link
              className="nav-link"
              to={`/user/${auth.id}`}
              title="My Profile"
            >
              My Profile
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
