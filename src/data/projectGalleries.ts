
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
          '🎮 Titre de travail : "The Forgotten"',
          '🎯 Genre : Aventure / Survival Horror',
          '👁️ Perspective : Troisième personne',
          '⚙️ Moteur de jeu : Unreal Engine 5',
          '💻 Plateforme cible : PC (Windows)',
          '🎨 Style visuel : Réalisme — Années 80, ambiance nocturne et brumeuse',
          '⏱️ Durée de développement : 10 mois',
          '👥 Équipe : 3 personnes',
          '🎯 Objectif : Créer un jeu complet et jouable (non commercialisé)'
        ]
      },
      {
        section: '📖 Concept du jeu - Pitch',
        content: [
          '🎭 Le joueur incarne un homme d\'une quarantaine d\'années venu dans une ville désertée à la suite d\'une crise économique.',
          '🌲 En explorant une vaste forêt et un ancien camp militaire, il tente de retrouver son frère disparu avec son escadron.',
          '🌫️ L\'univers est oppressant, plongé dans le brouillard et la nuit.',
          '👻 Le joueur est poursuivi par un monstre principal intuable et doit survivre en explorant, se cachant et combattant des créatures secondaires.'
        ]
      },
      {
        section: '🎮 Caractéristiques principales',
        content: [
          '🗺️ Monde semi-ouvert (forêt, maisons, campement militaire)',
          '🌙 Ambiance années 80, nocturne, réaliste et brumeuse',
          '🔦 Système de lumière (lampe à huile, torche) influant sur la visibilité',
          '⚔️ Combat au corps à corps uniquement (armes improvisées)',
          '👹 Ennemi principal invincible, poursuivant le joueur en continu',
          '🧟 Petits monstres destructibles',
          '🎒 Exploration, collecte d\'objets et gestion d\'inventaire simple',
          '😨 Thématique : isolement, peur, survie et perte'
        ]
      },
      {
        section: '🎯 Objectifs de production',
        content: [
          '✅ Concevoir un prototype complet, stable et jouable sous Unreal Engine 5',
          '🎭 Créer une expérience immersive reposant sur l\'atmosphère et la tension psychologique',
          '🎨 Garantir une cohérence visuelle et sonore avec des moyens limités (assets gratuits / low-cost)',
          '⚡ Optimiser pour un fonctionnement fluide sur PC milieu de gamme'
        ]
      },
      {
        section: '📅 Phase 1 — Pré-production (Mois 1-2)',
        content: [
          '🎯 Objectif : définir le cadre du projet et poser les bases techniques',
          '📝 Rédaction du Game Design Document (GDD) : concept narratif, gameplay, univers, mécaniques',
          '📋 Description des systèmes (combat, lumière, IA, inventaire)',
          '🗺️ Schéma de la carte et des zones clés',
          '🎨 Constitution d\'un moodboard visuel et sonore',
          '⚙️ Préparation du projet Unreal Engine 5 (paramètres, architecture de dossiers)',
          '🧪 Réalisation d\'un prototype basique : personnage, caméra, terrain test',
          '📦 Identification des assets disponibles (Unreal Marketplace, Megascans, Sketchfab)',
          '✅ Livrable : prototype de base fonctionnel'
        ]
      },
      {
        section: '🎮 Phase 2 — Prototype jouable (Mois 3-4)',
        content: [
          '🎯 Objectif : construire le cœur du gameplay',
          '⚔️ Implémentation du système de combat au corps à corps',
          '💡 Développement de la gestion de lumière (torche, lampe à huile, durée de vie)',
          '🎒 Création d\'un inventaire minimaliste',
          '🤖 Développement IA Monstre principal (traque, détection sonore et visuelle)',
          '👾 Développement IA Petits ennemis (patrouille, poursuite, attaque, mort)',
          '🌲 Création d\'un terrain prototype : forêt et bâtiments de test',
          '🔄 Test de la boucle de gameplay (exploration, collecte, fuite, combat)',
          '✅ Livrable : version jouable du cœur du jeu (alpha préliminaire)'
        ]
      },
      {
        section: '🏗️ Phase 3 — Production (Mois 5-7)',
        content: [
          '🎯 Objectif : construire le contenu principal du jeu',
          '🗺️ Construction du monde semi-ouvert : topographie, chemins, maisons, campement militaire',
          '🌳 Intégration d\'assets réalistes (environnement, végétation, éclairage)',
          '🏚️ Ajout de zones explorables, de caches et de ressources',
          '📖 Développement de la narration environnementale (indices, objets interactifs, journaux)',
          '🎵 Intégration de la bande-son et des effets audio d\'ambiance',
          '🎯 Création de la quête principale et des objectifs secondaires',
          '✅ Livrable : version Alpha complète (toutes mécaniques présentes, sans optimisation)'
        ]
      },
      {
        section: '⚡ Phase 4 — Optimisation et tests (Mois 8-9)',
        content: [
          '🎯 Objectif : stabiliser, équilibrer et peaufiner le jeu',
          '🚀 Optimisation graphique et performances (LOD, occlusion, lumière dynamique)',
          '🐛 Correction des bugs de collisions, IA et interface',
          '⚖️ Ajustement de la difficulté, de la vitesse du joueur et du comportement des ennemis',
          '🌫️ Amélioration du rendu atmosphérique (brouillard, lumière volumétrique, pluie éventuelle)',
          '🧪 Sessions de test internes et externes (feedback de joueurs tests)',
          '✅ Livrable : version Beta stable et jouable'
        ]
      },
      {
        section: '✅ Phase 5 — Finalisation (Mois 10)',
        content: [
          '🎯 Objectif : livrer une version finale jouable',
          '🎮 Intégration du menu principal, des options et de l\'écran de fin',
          '🐛 Correction des derniers bugs critiques',
          '🎬 Ajout du générique et des crédits',
          '💻 Compilation et tests finaux sur plusieurs machines',
          '🎥 Préparation d\'une courte vidéo de démonstration',
          '✅ Livrable : version finale stable (jeu complet jouable sur PC)'
        ]
      },
      {
        section: '📊 Rétroplanning synthétique',
        content: [
          '📅 Mois 1 : Pré-production — Rédaction GDD, moodboard, config UE5, terrain test',
          '📅 Mois 2 : Pré-production (suite) — Finalisation GDD, plan technique, tests gameplay',
          '📅 Mois 3 : Prototype — Combat corps à corps, gestion lumière, inventaire, début IA monstre',
          '📅 Mois 4 : Prototype (suite) — IA petits monstres, boucle gameplay, map test jouable',
          '📅 Mois 5 : Production — Level design (forêt, camp militaire, maisons), assets réalistes',
          '📅 Mois 6 : Production (suite) — Éléments narratifs, sound design, tests atmosphère',
          '📅 Mois 7 : Production (fin) — Finalisation carte, ajustements rythme, quête principale',
          '📅 Mois 8 : Optimisation — Graphismes, lumière, IA, correction bugs majeurs',
          '📅 Mois 9 : Tests — Playtests internes/externes, collecte feedback, équilibrage',
          '📅 Mois 10 : Finalisation — Menu principal, derniers bugs, générique, build final'
        ]
      },
      {
        section: '🛠️ Outils et ressources',
        content: [
          '⚙️ Moteur : Unreal Engine 5.3+',
          '📋 Gestion de projet : Notion / Trello',
          '🔄 Versioning : GitHub ou Perforce',
          '🎨 Assets : Unreal Marketplace, Quixel Megascans, Sketchfab (gratuits ou libres de droits)',
          '🎵 Audio : Freesound.org, Sonniss Game Audio Bundle',
          '📝 Documentation : Google Docs / Notion (GDD, suivi technique, bug list)',
          '🧪 Tests : Builds mensuels, sessions de test externes dès le mois 8'
        ]
      },
      {
        section: '⚠️ Risques et contraintes',
        content: [
          '🔴 Manque de temps (Impact élevé) → Solution : Réduire la taille de la carte et le nombre d\'ennemis',
          '🟠 Performance Unreal (Impact moyen) → Solution : Optimiser textures et éclairages dynamiques',
          '🟠 Manque d\'assets réalistes (Impact moyen) → Solution : Utiliser des packs gratuits / Megascans',
          '🔴 Travail en équipe réduite (Impact élevé) → Solution : Prioriser les systèmes clés et éviter les fonctions secondaires'
        ]
      },
      {
        section: '🎯 Livrable final attendu',
        content: [
          '✅ Jeu complet et jouable sur PC',
          '⏱️ Durée de jeu estimée : 30 à 60 minutes',
          '🎭 Ambiance immersive, cohérente et stable',
          '💻 Build final compilé et testé sous Windows'
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
