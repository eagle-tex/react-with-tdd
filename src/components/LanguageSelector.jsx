import { useTranslation } from 'react-i18next';
import withHover from '../withHover.jsx';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <a href="#" className="link-light">
        <img
          src="https://www.countryflagicons.com/FLAT/24/FR.png"
          title="French"
          onClick={() => i18n.changeLanguage('fr')}
          alt="French Flag"
        />
      </a>
      <a href="#" className="link-light">
        <img
          src="https://www.countryflagicons.com/FLAT/24/GB.png"
          title="English"
          onClick={() => i18n.changeLanguage('en')}
          alt="Great Britain Flag"
        />
      </a>
    </>
  );
};

export default withHover(LanguageSelector);
