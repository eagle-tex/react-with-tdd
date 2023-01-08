import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const LanguageSelector = props => {
  return (
    <>
      <a href="#" className="link-light">
        <img
          src="https://www.countryflagicons.com/FLAT/24/FR.png"
          title="French"
          onClick={() => props.i18n.changeLanguage('fr')}
          alt="French Flag"
        />
      </a>
      <a href="#" className="link-light">
        <img
          src="https://www.countryflagicons.com/FLAT/24/GB.png"
          title="English"
          onClick={() => props.i18n.changeLanguage('en')}
          alt="Great Britain Flag"
        />
      </a>
    </>
  );
};

LanguageSelector.propTypes = {
  // t: PropTypes.func,
  i18n: PropTypes.object
};

export default withTranslation()(LanguageSelector);
