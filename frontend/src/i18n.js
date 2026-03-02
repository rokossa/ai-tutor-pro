import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Hardcoding the English translations so you never see technical keys again!
const resources = {
  en: {
    translation: {
      marketing: {
        heroHeadline: "The world's most patient AI Tutor.",
        heroSub: "Boost confidence and grades with personalized math practice, real-time feedback, and comprehensive parent insights.",
        startTrial: "Start Free Trial",
        watchDemo: "Watch Demo",
        trusted: "Trusted by parents",
        testimonial: "Amazing results in just weeks!",
        curriculum: "ALIGNED WITH GRADE 1-12 CURRICULUM"
      },
      errors: {
        "404Headline": "Oops! Page Not Found",
        "404Body": "The learning module or page you are looking for has been moved or doesn't exist."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
