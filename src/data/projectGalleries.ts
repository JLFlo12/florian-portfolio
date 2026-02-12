
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
    projectId: 'jeu-narratif-25d--science-fiction-motionnelle',
    projectTitle: 'Jeu narratif 2.5D — Science-fiction émotionnelle',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=800&h=600&fit=crop',
        title: 'Univers sci-fi émotionnel',
        description: 'Ambiance contemplative et science-fiction'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop',
        title: 'La plage — Monde B',
        description: 'Lieu central du récit entre deux réalités'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
        title: 'Singularités & trous noirs',
        description: 'Effets visuels narratifs — collision des mondes'
      }
    ],
    details: [
      {
        section: '📋 Informations générales',
        content: [
          '🎮 Genre : Jeu narratif 2.5D — Science-fiction émotionnelle',
          '⚙️ Moteur : Godot 4.x',
          '💻 Plateforme cible : PC',
          '⏱️ Durée de jeu estimée : 20–40 minutes (démo)',
          '🎨 Style : Contemplatif, minimaliste, émotionnel',
          '🎯 Objectif : Explorer le deuil, l\'amour et la mécanique quantique à travers le gameplay'
        ]
      },
      {
        section: '📖 Concept — Pitch',
        content: [
          '🎭 Eliott, un lycéen brillant mais détaché, vit entre deux réalités depuis la mort de sa sœur Élise.',
          '🌊 La plage est le point de convergence : un souvenir figé qui refuse de disparaître.',
          '💫 L\'arrivée de Lina stabilise ses "interférences" — mais les deux mondes entrent en collision.',
          '🔮 Le joueur fait face à un choix quantique : observer pour rester, ou lâcher et disparaître.'
        ]
      },
      {
        section: '🎮 Structure narrative — 5 Chapitres',
        content: [
          '📕 Chapitre 1 — État Stable : Routine d\'Eliott, premières anomalies (vertiges, déjà-vu), arrivée de Lina',
          '📗 Chapitre 2 — Résonance : Construction de la romance, moments partagés, premiers doutes',
          '📘 Chapitre 3 — Superposition : Révélation du Monde B, plage figée, Lina enfant, flashbacks d\'Élise',
          '📙 Chapitre 4 — Collision : Les deux mondes en conflit, Lina disparaît définitivement',
          '📒 Chapitre 5 — Observation : Choix final quantique, deux épilogues distincts'
        ]
      },
      {
        section: '⚙️ Systèmes de gameplay',
        content: [
          '🎮 Player controller 2.5D avec caméra follow',
          '💬 Système de dialogue avec choix, flags et conditions',
          '🌍 Maps à états multiples (Monde A / Monde B / Fusion)',
          '🌀 Interférences visuelles (shaders : blur, aberration chromatique, displacement)',
          '🕳️ Singularités / trous noirs (zones de danger sensoriel)',
          '💕 Mini-jeux émotionnels (marche synchronisée, révisions, lancer de cailloux)',
          '🎬 Cutscenes scriptées (caméra sur rails, dialogues intégrés)',
          '🔊 Audio adaptatif selon world_state (Normal / Interference / Void)'
        ]
      },
      {
        section: '📅 Plan de production',
        content: [
          '📦 Étape 0 : Préparation projet Godot, arborescence, page vision (1-2 jours)',
          '🎮 Étape 1 : Prototype jouable — Vertical Slice (contrôles, dialogue, transitions)',
          '💬 Étape 2 : Système de dialogue solide (JSON, choix, flags, conditions)',
          '📊 Étape 3 : Story Manager & progression (GameState, EventBus, chapitres/actes)',
          '🗺️ Étape 4 : Pipeline Maps (1 layout × 3 couches d\'ambiance)',
          '🌀 Étape 5 : Interférences (post-process shader, audio filtré)',
          '🕳️ Étape 6 : Singularités (Area3D, drag, distorsion)',
          '💕 Étape 7 : Mini-jeux émotionnels',
          '🎬 Étape 8 : Cutscenes & mise en scène',
          '🔮 Étape 9 : Choix final quantique + deux épilogues',
          '🔊 Étape 10 : Audio adaptatif',
          '💾 Étape 11 : Sauvegardes & QA'
        ]
      },
      {
        section: '🎯 Fins du jeu',
        content: [
          '✅ Fin heureuse : Eliott accepte l\'incertitude — Lina revient, ils vivent ensemble',
          '💀 Fin tragique : Le système se ferme — Lina revient, mais Eliott n\'est plus là',
          '💡 Message final : "Observer, c\'est rester. Lâcher, c\'est disparaître."'
        ]
      }
    ]
  },
  {
    projectId: 'thornfall--action-rpg-souls-like',
    projectTitle: 'Thornfall — Action RPG Souls-like',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=600&fit=crop',
        title: 'Forêt sinistre',
        description: 'Environnement dark fantasy oppressant'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        title: 'Combat Souls-like',
        description: 'Système de combat lourd et punitif'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop',
        title: 'Boss — Althéon',
        description: 'Gardien de Noirracine — Boss final de la démo'
      }
    ],
    details: [
      {
        section: '📋 Informations générales',
        content: [
          '🎮 Titre : Thornfall',
          '🎯 Genre : Action RPG — Souls-like',
          '⚙️ Moteur : Unreal Engine',
          '💻 Plateforme : PC (manette recommandée)',
          '👥 Équipe : 2 programmeurs + 1 game designer',
          '⏱️ Durée de la démo : ~20 minutes',
          '🎨 Style : Dark fantasy, couleurs désaturées, brume et ombres'
        ]
      },
      {
        section: '📖 Vision & Objectif',
        content: [
          '⚔️ Combat lourd et punitif — chaque action a un coût',
          '👹 Boss mémorable et très difficile',
          '💀 Apprentissage par la mort et l\'observation',
          '🎯 Prouver la solidité du gameplay Souls-like en démo courte'
        ]
      },
      {
        section: '🎮 Core Gameplay Loop',
        content: [
          '🌲 Exploration prudente de la forêt sinistre',
          '⚔️ Affrontement d\'ennemis standards',
          '💀 Mort → perte de ressources → retour au checkpoint',
          '🧠 Apprentissage des patterns',
          '👹 Affrontement du boss final : Althéon, Gardien de Noirracine'
        ]
      },
      {
        section: '⚔️ Système de combat',
        content: [
          '🗡️ 1 arme unique : grosse épée — attaques lentes et puissantes',
          '⚡ Stamina max : 100 — Régénération : 20/s (délai 0.8s)',
          '🔹 Attaque légère : 20 stamina, 100 dégâts, 0.9s',
          '🔸 Attaque lourde : 40 stamina, 180 dégâts, 1.6s',
          '🔵 Roulade : 30 stamina, i-frames 0.35s',
          '🛡️ Garde : drain 10/s + 25 par impact, garde brisée à 0 stamina (stun 1.5s)',
          '💊 Soins : 3 charges, 2s d\'animation, interruptible'
        ]
      },
      {
        section: '👹 Boss — Althéon, Gardien de Noirracine',
        content: [
          '❤️ PV : 3 500 — Dégâts : 40-60% des PV du joueur',
          '1️⃣ Coup vertical écrasant : casse-garde, drain stamina +40',
          '2️⃣ Balayage horizontal : anti-roulade, arc large',
          '3️⃣ Enchaînement 2 coups : test de discipline, punition attaque trop tôt',
          '4️⃣ Estoc enracinée : racines en ligne, punition distance moyenne',
          '5️⃣ Coup retardé : mind game, timing trompeur',
          '6️⃣ Rugissement de Noirracine : drain 60 stamina, pas de dégâts directs',
          '🔥 Phase critique (≤30% PV) : attaques plus fréquentes, enchaînements, moins de pauses'
        ]
      },
      {
        section: '🏗️ Phases de production',
        content: [
          '🟢 Phase 1 — Pré-production : scope verrouillé, document combat, répartition rôles',
          '🟡 Phase 2 — Prototype jouable : contrôles, stamina, combat basique',
          '🟠 Phase 3 — Ennemis & Boss : ennemi standard, prototype boss, design patterns',
          '🔵 Phase 4 — Level Design : greybox forêt, placement ennemis, checkpoint',
          '🟣 Phase 5 — Polishing : feedback joueur, équilibrage boss, UX/lisibilité',
          '🔴 Phase 6 — Finalisation : tests externes, ajustements finaux, build final'
        ]
      },
      {
        section: '🧠 Règles d\'or',
        content: [
          '⚔️ Toute action a un coût',
          '💀 Toute erreur est punissable',
          '👁️ Toute attaque doit être lisible',
          '⚡ La stamina est plus importante que les PV',
          '🎯 Le joueur perd par impatience, pas par injustice',
          '🚫 Si ça ne rend pas le combat meilleur, ça dégage'
        ]
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
