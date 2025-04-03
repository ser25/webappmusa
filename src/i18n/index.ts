import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uk: {
    translation: {
      chat: {
        inputPlaceholder: 'Напиши, як ти себе почуваєш...',
        send: 'Надіслати',
        sending: 'Надсилаю...',
        error: 'Помилка: {{error}}'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uk',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 