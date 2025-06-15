
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
        intro: 'Étudiant passionné par les technologies réseau et la cybersécurité',
        cvTitle: 'Mon CV',
        downloadCV: 'Télécharger mon CV',
        viewCV: 'Visualiser en ligne',
        educationTitle: 'Formation',
        educationDegree: 'BUT Réseaux & Télécommunications',
        educationDescription: 'En cours - Spécialisation en cybersécurité et administration réseau',
        expertiseTitle: 'Expertise',
        networkTitle: 'Réseaux',
        networkDescription: 'Configuration et administration de réseaux d\'entreprise, VLAN, routage dynamique et statique',
        systemsTitle: 'Systèmes',
        systemsDescription: 'Administration Linux/Windows Server, virtualisation, conteneurisation',
        cybersecurityTitle: 'Cybersécurité',
        cybersecurityDescription: 'Analyse de vulnérabilités, hardening système, sensibilisation aux bonnes pratiques'
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
        intro: 'Student passionate about network technologies and cybersecurity',
        cvTitle: 'My Resume',
        downloadCV: 'Download my Resume',
        viewCV: 'View online',
        educationTitle: 'Education',
        educationDegree: 'B.Tech Networks & Telecommunications',
        educationDescription: 'In progress - Specializing in cybersecurity and network administration',
        expertiseTitle: 'Expertise',
        networkTitle: 'Networks',
        networkDescription: 'Enterprise network configuration and administration, VLAN, dynamic and static routing',
        systemsTitle: 'Systems',
        systemsDescription: 'Linux/Windows Server administration, virtualization, containerization',
        cybersecurityTitle: 'Cybersecurity',
        cybersecurityDescription: 'Vulnerability analysis, system hardening, best practices awareness'
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
