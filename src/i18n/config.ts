
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
        contact: 'Contact',
        chatbot: 'CyberBot'
      },
      chatbot: {
        subtitle: 'Assistant IA — Posez-moi vos questions sur Florian',
        welcome: 'Bienvenue. Je suis FG-CyberBot, votre assistant cybersécurité.',
        hint: 'Posez-moi une question sur Florian, ses compétences ou ses projets.',
        placeholder: 'Tapez votre message...'
      },
      // Home page
      home: {
        role: 'Étudiant en BUT Réseaux & Télécommunications',
        bio: 'Étudiant passionné par l\'informatique, le développement et la cyber.',
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
        viewProject: 'Voir le projet',
        // Titres de projets traduits
        projectTitles: {
          'the-forgotten-survival-horror': 'The Forgotten - Survival Horror',
          'hygiene-cybersecurite': 'Hygiène et cybersécurité',
          'pilotage-led-raspberry': 'Pilotage de LED avec Raspberry Pi',
          'analyse-transmission-wifi': 'Analyse de transmission WiFi',
          'creation-portfolio': 'Création d\'un portfolio personnel',
          'reseau-entreprise-gns3': 'Réseau pour petite entreprise (GNS3)',
          'mesure-signal': 'Mesure et caractérisation d\'un signal',
          'projet-integratif-gns3': 'Projet intégratif : Topologie centralisée + succursale (GNS3)',
          'site-suivi-commande': 'Création d\'un site web de suivi de commande'
        },
        // Descriptions de projets traduites
        projectDescriptions: {
          'the-forgotten-survival-horror': 'Développement d\'un jeu survival horror en Unreal Engine 5 - Exploration, survie et ambiance oppressante dans une forêt brumeuse',
          'hygiene-cybersecurite': 'Apprentissage des bonnes pratiques de sécurité (mots de passe, antivirus, pare-feu, etc.)',
          'pilotage-led-raspberry': 'Contrôle de LED à distance via un serveur web sur Raspberry Pi',
          'analyse-transmission-wifi': 'Étude de la puissance des signaux WiFi avec WiFi Analyzer et documentation des résultats',
          'creation-portfolio': 'Premier site portfolio simple en HTML/CSS/JS',
          'reseau-entreprise-gns3': 'Conception d\'une infrastructure réseau complète dans GNS3 avec routage, VLAN, NAT, etc.',
          'mesure-signal': 'Analyse de signaux physiques à l\'oscilloscope, calcul de fréquence et d\'amplitude',
          'projet-integratif-gns3': 'Réseau GNS3 simulant un site principal et une succursale interconnectée',
          'site-suivi-commande': 'Développement d\'une web app permettant la gestion et le suivi de commandes, triées par statut, type et fournisseur'
        }
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
        contact: 'Contact',
        chatbot: 'CyberBot'
      },
      chatbot: {
        subtitle: 'AI Assistant — Ask me anything about Florian',
        welcome: 'Welcome. I am FG-CyberBot, your cybersecurity assistant.',
        hint: 'Ask me about Florian, his skills or his projects.',
        placeholder: 'Type your message...'
      },
      // Home page
      home: {
        role: 'Student in Networks & Telecommunications',
        bio: 'Computer science, development and cybersecurity enthusiast.',
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
        viewProject: 'View project',
        // Titres de projets traduits
        projectTitles: {
          'the-forgotten-survival-horror': 'The Forgotten - Survival Horror',
          'hygiene-cybersecurite': 'IT Hygiene and Cybersecurity',
          'pilotage-led-raspberry': 'LED Control with Raspberry Pi',
          'analyse-transmission-wifi': 'WiFi Transmission Analysis',
          'creation-portfolio': 'Personal Portfolio Creation',
          'reseau-entreprise-gns3': 'Small Business Network (GNS3)',
          'mesure-signal': 'Signal Measurement and Characterization',
          'projet-integratif-gns3': 'Integrative Project: Centralized Topology + Branch (GNS3)',
          'site-suivi-commande': 'Order Tracking Website Creation'
        },
        // Descriptions de projets traduites
        projectDescriptions: {
          'the-forgotten-survival-horror': 'Survival horror game development in Unreal Engine 5 - Exploration, survival and oppressive atmosphere in a foggy forest',
          'hygiene-cybersecurite': 'Learning security best practices (passwords, antivirus, firewall, etc.)',
          'pilotage-led-raspberry': 'Remote LED control via web server on Raspberry Pi',
          'analyse-transmission-wifi': 'WiFi signal strength study with WiFi Analyzer and results documentation',
          'creation-portfolio': 'First simple portfolio website using HTML/CSS/JS',
          'reseau-entreprise-gns3': 'Complete network infrastructure design in GNS3 with routing, VLAN, NAT, etc.',
          'mesure-signal': 'Physical signal analysis with oscilloscope, frequency and amplitude calculation',
          'projet-integratif-gns3': 'GNS3 network simulating a main site and an interconnected branch',
          'site-suivi-commande': 'Web app development for order management and tracking, sorted by status, type and supplier'
        }
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
