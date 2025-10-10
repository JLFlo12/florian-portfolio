
// Configuration facile pour modifier les images des projets
// Il suffit de modifier les URLs ici pour changer les images affichées

export interface ProjectImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface ProjectFile {
  id: string;
  url: string;
  title: string;
  description?: string;
  type: 'html' | 'css' | 'js' | 'image';
}

export interface ProjectDetail {
  section: string;
  content: string[];
}

export interface ProjectGallery {
  projectId: string;
  projectTitle: string;
  images: ProjectImage[];
  files?: ProjectFile[];
  details?: ProjectDetail[];
}

export const projectGalleries: ProjectGallery[] = [
  {
    projectId: 'the-forgotten-survival-horror',
    projectTitle: 'The Forgotten - Survival Horror',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
        title: 'Ambiance forestière',
        description: 'Forêt brumeuse et oppressante - années 80'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
        title: 'Camp militaire abandonné',
        description: 'Exploration du campement militaire désert'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop',
        title: 'Système de lumière',
        description: 'Lampe à huile et torche - gameplay central'
      }
    ],
    details: [
      {
        section: '📋 Informations générales',
        content: [
          '🎮 Titre : "The Forgotten"',
          '🎯 Genre : Aventure / Survival Horror',
          '👁️ Perspective : Troisième personne',
          '⚙️ Moteur : Unreal Engine 5',
          '💻 Plateforme : PC (Windows)',
          '🎨 Style : Réalisme années 80, nocturne et brumeux',
          '⏱️ Durée : 10 mois de développement',
          '👥 Équipe : 3 personnes'
        ]
      },
      {
        section: '📖 Concept du jeu',
        content: [
          '🎭 Le joueur incarne un homme d\'une quarantaine d\'années venu dans une ville désertée suite à une crise économique.',
          '🌲 Exploration d\'une vaste forêt et d\'un ancien camp militaire pour retrouver son frère disparu avec son escadron.',
          '👻 Monstre principal intuable qui poursuit le joueur',
          '⚔️ Combat au corps à corps uniquement avec armes improvisées',
          '🔦 Système de lumière (lampe à huile, torche) influant sur la visibilité',
          '🧟 Petits monstres destructibles',
          '🗺️ Monde semi-ouvert avec exploration, collecte et inventaire',
          '😨 Thématique : isolement, peur, survie et perte'
        ]
      },
      {
        section: '🎯 Objectifs de production',
        content: [
          '✅ Prototype complet, stable et jouable sous Unreal Engine 5',
          '🎭 Expérience immersive basée sur l\'atmosphère et la tension',
          '🎨 Cohérence visuelle et sonore avec moyens limités',
          '⚡ Optimisation pour PC milieu de gamme'
        ]
      },
      {
        section: '📅 Phase 1 - Pré-production (Mois 1-2)',
        content: [
          '📝 Rédaction du Game Design Document',
          '🎨 Constitution du moodboard visuel et sonore',
          '⚙️ Préparation du projet Unreal Engine 5',
          '🧪 Prototype basique : personnage, caméra, terrain test',
          '📦 Identification des assets disponibles'
        ]
      },
      {
        section: '🎮 Phase 2 - Prototype jouable (Mois 3-4)',
        content: [
          '⚔️ Système de combat au corps à corps',
          '💡 Gestion de lumière (torche, lampe à huile)',
          '🎒 Inventaire minimaliste',
          '🤖 IA du monstre principal (traque, détection)',
          '👾 IA des petits ennemis (patrouille, attaque)',
          '🌲 Terrain prototype avec boucle de gameplay',
          '🧪 Tests d\'exploration, collecte, fuite, combat'
        ]
      },
      {
        section: '🏗️ Phase 3 - Production (Mois 5-7)',
        content: [
          '🗺️ Construction du monde semi-ouvert',
          '🌳 Intégration d\'assets réalistes',
          '🏚️ Zones explorables, caches et ressources',
          '📖 Narration environnementale (indices, objets)',
          '🎵 Intégration bande-son et effets audio',
          '🎯 Quête principale et objectifs secondaires'
        ]
      },
      {
        section: '⚡ Phase 4 - Optimisation (Mois 8-9)',
        content: [
          '🚀 Optimisation graphique et performances',
          '🐛 Correction bugs (collisions, IA, interface)',
          '⚖️ Ajustement difficulté et comportements',
          '🌫️ Amélioration atmosphère (brouillard, lumière)',
          '🧪 Sessions de test internes et externes'
        ]
      },
      {
        section: '✅ Phase 5 - Finalisation (Mois 10)',
        content: [
          '🎮 Menu principal et options',
          '🐛 Correction bugs critiques',
          '🎬 Générique et crédits',
          '💻 Compilation et tests multi-machines',
          '🎥 Vidéo de démonstration'
        ]
      },
      {
        section: '🛠️ Outils et ressources',
        content: [
          '⚙️ Unreal Engine 5.3+',
          '📋 Gestion : Notion / Trello',
          '🔄 Versioning : GitHub / Perforce',
          '🎨 Assets : Unreal Marketplace, Quixel Megascans',
          '🎵 Audio : Freesound.org, Sonniss',
          '📝 Documentation : Google Docs / Notion'
        ]
      },
      {
        section: '🎯 Livrable final',
        content: [
          '✅ Jeu complet et jouable sur PC',
          '⏱️ Durée : 30 à 60 minutes',
          '🎭 Ambiance immersive et cohérente',
          '💻 Build compilé testé sous Windows'
        ]
      }
    ]
  },
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
    projectId: 'creation-dun-portfolio-personnel',
    projectTitle: 'Création d\'un portfolio personnel',
    images: [
      {
        id: '1',
        url: '/portfolio-v1/images/pfp.jpg',
        title: 'Photo de profil',
        description: 'Photo utilisée dans le portfolio V1'
      },
      {
        id: '2',
        url: '/portfolio-v1/images/hacker.jpg',
        title: 'Image thématique',
        description: 'Image d\'ambiance cybersécurité'
      },
      {
        id: '3',
        url: '/portfolio-v1/images/raspberry.jpg',
        title: 'Raspberry Pi',
        description: 'Photo du Raspberry Pi utilisé dans les projets'
      }
    ],
    files: [
      {
        id: '1',
        url: '/portfolio-v1/index.html',
        title: 'Page d\'accueil (index.html)',
        description: 'Page principale du portfolio V1',
        type: 'html'
      },
      {
        id: '2',
        url: '/portfolio-v1/cv.html',
        title: 'Page CV (cv.html)',
        description: 'Page curriculum vitae détaillé',
        type: 'html'
      },
      {
        id: '3',
        url: '/portfolio-v1/style.css',
        title: 'Feuille de style (style.css)',
        description: 'Styles CSS du portfolio',
        type: 'css'
      },
      {
        id: '4',
        url: '/portfolio-v1/script.js',
        title: 'Script JavaScript (script.js)',
        description: 'Fonctionnalités interactives (mode sombre, traduction)',
        type: 'js'
      },
      {
        id: '5',
        url: '/portfolio-v1/TEST.html',
        title: 'Test mode jour/nuit (TEST.html)',
        description: 'Page de test pour le basculement jour/nuit',
        type: 'html'
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
