
// Configuration facile pour modifier les images des projets
// Il suffit de modifier les URLs ici pour changer les images affichées

export interface ProjectImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface ProjectGallery {
  projectId: string;
  projectTitle: string;
  images: ProjectImage[];
}

export const projectGalleries: ProjectGallery[] = [
  {
    projectId: 'hygiene-cybersecurite',
    projectTitle: 'Hygiène et cybersécurité',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        title: 'Configuration antivirus',
        description: 'Mise en place des solutions de sécurité'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        title: 'Analyse des menaces',
        description: 'Étude des vulnérabilités système'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        title: 'Formation utilisateurs',
        description: 'Sensibilisation aux bonnes pratiques'
      }
    ]
  },
  {
    projectId: 'raspberry-pi-led',
    projectTitle: 'Pilotage de LED avec Raspberry Pi',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        title: 'Circuit LED',
        description: 'Montage des composants électroniques'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
        title: 'Interface web',
        description: 'Développement de l\'interface de contrôle'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        title: 'Code Python',
        description: 'Programmation du contrôleur GPIO'
      }
    ]
  },
  {
    projectId: 'analyse-wifi',
    projectTitle: 'Analyse de transmission WiFi',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        title: 'WiFi Analyzer',
        description: 'Interface de l\'outil d\'analyse'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        title: 'Mesures de signal',
        description: 'Relevés de puissance des signaux'
      }
    ]
  },
  {
    projectId: 'portfolio-personnel',
    projectTitle: 'Création d\'un portfolio personnel',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
        title: 'Design initial',
        description: 'Maquettes et wireframes'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
        title: 'Développement',
        description: 'Code HTML/CSS/JavaScript'
      }
    ]
  },
  {
    projectId: 'reseau-gns3',
    projectTitle: 'Réseau pour petite entreprise (GNS3)',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        title: 'Topologie réseau',
        description: 'Architecture du réseau GNS3'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        title: 'Configuration VLAN',
        description: 'Paramétrage des réseaux virtuels'
      }
    ]
  },
  {
    projectId: 'mesure-signal',
    projectTitle: 'Mesure et caractérisation d\'un signal',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        title: 'Oscilloscope',
        description: 'Analyse des signaux électriques'
      }
    ]
  },
  {
    projectId: 'topologie-centralisee',
    projectTitle: 'Projet intégratif : Topologie centralisée + succursale (GNS3)',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        title: 'Site principal',
        description: 'Configuration du site central'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        title: 'Interconnexion',
        description: 'Liaison avec la succursale'
      }
    ]
  },
  {
    projectId: 'suivi-commande',
    projectTitle: 'Création d\'un site web de suivi de commande',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
        title: 'Interface utilisateur',
        description: 'Dashboard de suivi des commandes'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        title: 'Base de données',
        description: 'Architecture des données'
      }
    ]
  }
];

// Fonction utilitaire pour récupérer une galerie par ID
export const getProjectGallery = (projectId: string): ProjectGallery | undefined => {
  return projectGalleries.find(gallery => gallery.projectId === projectId);
};

// Fonction pour créer l'ID du projet à partir du titre
export const createProjectId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Enlever les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/--+/g, '-') // Remplacer les tirets multiples par un seul
    .trim();
};
