import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { "welcome": "Master your local curriculum with AI.", "start_trial": "Start 14-Day Free Trial", "onboarding_step1": "Let's personalize your experience.", "grade": "Grade Level", "region": "Region" } },
  fr: { translation: { "welcome": "Maîtrisez votre programme local avec l'IA.", "start_trial": "Commencer l'essai gratuit de 14 jours", "onboarding_step1": "Personnalisons votre expérience.", "grade": "Niveau scolaire", "region": "Région" } }
};

i18n.use(initReactI18next).init({ resources, lng: "en", fallbackLng: "en", interpolation: { escapeValue: false } });

export default i18n;
