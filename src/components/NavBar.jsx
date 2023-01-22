import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/hoaxify.png';
import { AuthContext } from '../state/AuthContextWrapper';
import { useContext } from 'react';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavBar = props => {
  const { t } = useTranslation();
  // const auth = useContext(AuthContext);
  // const auth = useSelector(store => store);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light shadow">
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          <img src={logo} alt="Hoaxify" width="60" />
          Hoaxify
        </Link>
        <ul className="navbar-nav">
          {!props.isLoggedIn && (
            <>
              <Link className="nav-link" to="/signup" title={t('signUp')}>
                {t('signUp')}
              </Link>
              <Link className="nav-link" to="/login" title="Login">
                {t('login')}
              </Link>
            </>
          )}
          {props.isLoggedIn && (
            <Link
              className="nav-link"
              to={`/user/${props.id}`}
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

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  id: PropTypes.number
};

const mapStateToProps = store => {
  return store;
};

export default connect(mapStateToProps)(NavBar);
