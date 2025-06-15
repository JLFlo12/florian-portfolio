import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      nav: {
        home: 'Accueil',
        projects: 'Projets',
        about: 'À propos',
        contact: 'Contact'
      },
      // Home page
      home: {
        role: 'Étudiant en BUT Réseaux & Télécommunications',
        bio: 'Étudiant passionné par les réseaux, les systèmes et la cybersécurité.',
        location: 'La Réunion, France',
        cta: 'Découvrir mes projets',
        skillsTitle: 'Compétences Techniques',
        softSkillsTitle: 'Soft Skills',
        toolsTitle: 'Outils que j\'utilise'
      },
      // Projects page
      projects: {
        title: 'Mes Projets',
        completed: 'Terminés',
        inProgress: 'En cours',
        viewProject: 'Voir le projet'
      },
      // About page
      about: {
        title: 'À Propos',
        intro: 'Étudiant passionné par les technologies réseau et la cybersécurité'
      },
      // Contact page
      contact: {
        title: 'Contact',
        subtitle: 'Discutons de vos projets',
        email: 'Email',
        github: 'GitHub',
        linkedin: 'LinkedIn'
      }
    }
  },
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact'
      },
      // Home page
      home: {
        role: 'Student in Networks & Telecommunications',
        bio: 'Networking, systems and cybersecurity enthusiast.',
        location: 'La Réunion, France',
        cta: 'Discover my projects',
        skillsTitle: 'Technical Skills',
        softSkillsTitle: 'Soft Skills',
        toolsTitle: 'My Tools'
      },
      // Projects page
      projects: {
        title: 'My Projects',
        completed: 'Completed',
        inProgress: 'In Progress',
        viewProject: 'View project'
      },
      // About page
      about: {
        title: 'About',
        intro: 'Student passionate about network technologies and cybersecurity'
      },
      // Contact page
      contact: {
        title: 'Contact',
        subtitle: "Let's discuss your projects",
        email: 'Email',
        github: 'GitHub',
        linkedin: 'LinkedIn'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
