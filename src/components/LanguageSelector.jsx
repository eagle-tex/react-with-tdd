import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withHover from '../withHover.jsx';

const LanguageSelector = props => {
  const { i18n } = useTranslation();

  let size = 24;
  if (props.on) {
    size = 48;
  }

  return (
    <>
      {props.text}
      <a href="#" className="link-light">
        <img
          src={`https://www.countryflagicons.com/FLAT/${size}/FR.png`}
          title="French"
          onClick={() => i18n.changeLanguage('fr')}
          alt="French Flag"
        />
      </a>
      <a href="#" className="link-light">
        <img
          src={`https://www.countryflagicons.com/FLAT/${size}/GB.png`}
          title="English"
          onClick={() => i18n.changeLanguage('en')}
          alt="Great Britain Flag"
        />
      </a>
    </>
  );
};

LanguageSelector.propTypes = {
  text: PropTypes.string,
  on: PropTypes.bool
};

export default withHover(LanguageSelector);
// export default LanguageSelector;
