import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useHover from '../useHover.jsx';
import { useRef } from 'react';

const LanguageSelector = props => {
  const { i18n } = useTranslation();
  const ref = useRef();
  const on = useHover(ref.current);

  let size = 24;
  if (on) {
    size = 48;
  }

  return (
    <div ref={ref}>
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
    </div>
  );
};

LanguageSelector.propTypes = {
  text: PropTypes.string,
  on: PropTypes.bool
};

export default LanguageSelector;
