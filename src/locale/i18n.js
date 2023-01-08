import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        signUp: 'Sign Up',
        username: 'Username',
        email: 'E-mail',
        password: 'Password',
        passwordRepeat: 'Password Repeat'
      }
    },
    fr: {
      translation: {
        signUp: 'Créer un compte',
        username: 'Nom utilisateur',
        email: 'E-mail',
        password: 'Mot de passe',
        passwordRepeat: 'Répéter mot de passe'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
