import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav_features": "Features",
      "nav_curriculum": "Curriculum",
      "nav_pricing": "Pricing",
      "start_trial": "Start Free Trial",
      "hero_title": "Master your ",
      "hero_highlight": "local curriculum",
      "hero_suffix": " with AI.",
      "hero_sub": "Stop struggling with generic tutorials. Our multimodal AI instantly generates practice problems mapped exactly to your school board's standards.",
      "pricing_title": "Simple, transparent pricing.",
      "pricing_sub": "Invest in their future for less than the cost of one traditional tutoring session.",
      "curriculum_title": "Mapped to North America's Top Standards",
      "step1_title": "Let's personalize your learning.",
      "region": "Province / State",
      "grade": "Grade Level"
    }
  },
  fr: {
    translation: {
      "nav_features": "Fonctionnalités",
      "nav_curriculum": "Programme",
      "nav_pricing": "Tarifs",
      "start_trial": "Essai Gratuit",
      "hero_title": "Maîtrisez votre ",
      "hero_highlight": "programme local",
      "hero_suffix": " avec l'IA.",
      "hero_sub": "Fini les tutoriels génériques. Notre IA multimodale génère instantanément des exercices adaptés aux normes exactes de votre commission scolaire.",
      "pricing_title": "Des tarifs simples et transparents.",
      "pricing_sub": "Investissez dans leur avenir pour moins que le coût d'une seule séance de tutorat traditionnel.",
      "curriculum_title": "Aligné sur les meilleurs standards d'Amérique du Nord",
      "step1_title": "Personnalisons votre apprentissage.",
      "region": "Province / État",
      "grade": "Niveau Scolaire"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
