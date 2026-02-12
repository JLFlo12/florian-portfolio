
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { createProjectId } from '@/data/projectGalleries';

const Projects = () => {
  const { t } = useTranslation();

  const inProgressProjects = [
    {
      title: 'The Forgotten - Survival Horror',
      description: {
        fr: 'Développement d\'un jeu survival horror en Unreal Engine 5 - Exploration, survie et ambiance oppressante dans une forêt brumeuse',
        en: 'Survival horror game development in Unreal Engine 5 - Exploration, survival and oppressive atmosphere in a foggy forest'
      },
      status: 'inProgress',
      technologies: ['Unreal Engine 5', 'Game Design', 'Level Design', 'IA'],
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Jeu narratif 2.5D — Science-fiction émotionnelle',
      description: {
        fr: 'Jeu narratif 2.5D développé avec Godot — Science-fiction émotionnelle avec choix quantiques, deux fins et gameplay contemplatif',
        en: '2.5D narrative game built with Godot — Emotional sci-fi with quantum choices, two endings and contemplative gameplay'
      },
      status: 'inProgress',
      technologies: ['Godot 4', 'Game Design', 'Narration', 'Shaders'],
      thumbnail: 'https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Thornfall — Action RPG Souls-like',
      description: {
        fr: 'Démo Souls-like en Unreal Engine — Combat lourd et punitif, boss mémorable, forêt sinistre en dark fantasy',
        en: 'Souls-like demo in Unreal Engine — Heavy punishing combat, memorable boss, dark fantasy sinister forest'
      },
      status: 'inProgress',
      technologies: ['Unreal Engine', 'Combat System', 'IA Boss', 'Dark Fantasy'],
      thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=800&h=600&fit=crop'
    }
  ];

  const completedProjects = [
    {
      title: 'Hygiène et cybersécurité',
      description: {
        fr: 'Apprentissage des bonnes pratiques de sécurité (mots de passe, antivirus, pare-feu, etc.)',
        en: 'Awareness training on cybersecurity and IT hygiene best practices'
      },
      status: 'completed',
      technologies: ['Sécurité', 'Formation'],
      canvaLink: 'https://www.canva.com/design/DAGR75eU94c/lgzMFgPQ42BKlzcXY9N0mw/view',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Pilotage de LED avec Raspberry Pi',
      description: {
        fr: 'Contrôle de LED à distance via un serveur web sur Raspberry Pi',
        en: 'Remote LED control using a Raspberry Pi and a web interface'
      },
      status: 'completed',
      technologies: ['Raspberry Pi', 'Python', 'GPIO'],
      canvaLink: 'https://www.canva.com/design/DAGdTMt714c/HsmxLn-e2kNvwDFtxLDwhg/edit',
      thumbnail: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Analyse de transmission WiFi',
      description: {
        fr: 'Étude de la puissance des signaux WiFi avec WiFi Analyzer et documentation des résultats',
        en: 'Measuring WiFi signal strength using WiFi Analyzer'
      },
      status: 'completed',
      technologies: ['WiFi', 'Analyse', 'Documentation'],
      canvaLink: 'https://www.canva.com/design/DAGdsXFIEP0/vEx7owRuxu67lumBODcDQg/edit?utm_content=DAGdsXFIEP0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Création d\'un portfolio personnel',
      description: {
        fr: 'Premier site portfolio simple en HTML/CSS/JS',
        en: 'First personal portfolio website using HTML/CSS/JS'
      },
      status: 'completed',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      portfolioLink: 'https://florian-sooty.vercel.app/',
      thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Réseau pour petite entreprise (GNS3)',
      description: {
        fr: 'Conception d\'une infrastructure réseau complète dans GNS3 avec routage, VLAN, NAT, etc.',
        en: 'Building a full small-business network in GNS3 (VLAN, routing, NAT...)'
      },
      status: 'completed',
      technologies: ['GNS3', 'VLAN', 'Routage', 'NAT'],
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Mesure et caractérisation d\'un signal',
      description: {
        fr: 'Analyse de signaux physiques à l\'oscilloscope, calcul de fréquence et d\'amplitude',
        en: 'Signal analysis with oscilloscope, frequency and amplitude measurement'
      },
      status: 'completed',
      technologies: ['Oscilloscope', 'Analyse', 'Signaux'],
      canvaLink: 'https://www.canva.com/design/DAGqmUrS6yE/xnbNcz-UEiyQwCQW5gZ1HQ/edit',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Projet intégratif : Topologie centralisée + succursale (GNS3)',
      description: {
        fr: 'Réseau GNS3 simulant un site principal et une succursale interconnectée',
        en: 'Simulated GNS3 network with a main site and a remote branch'
      },
      status: 'completed',
      technologies: ['GNS3', 'Topologie', 'Interconnexion'],
      canvaLink: 'https://www.canva.com/design/DAGqmUrS6yE/xnbNcz-UEiyQwCQW5gZ1HQ/edit',
      thumbnail: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800&h=600&fit=crop'
    },
    {
      title: 'Création d\'un site web de suivi de commande',
      description: {
        fr: 'Développement d\'une web app permettant la gestion et le suivi de commandes, triées par statut, type et fournisseur',
        en: 'Order tracking web app with filtering by status, type, and supplier'
      },
      status: 'completed',
      technologies: ['React', 'TypeScript', 'Base de données'],
      canvaLink: 'https://www.canva.com/design/DAGjpZz6DBo/KOSw2rqbdxCLlwOk5y6p8Q/edit',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600&fit=crop'
    }
  ];

  const ProjectCard = ({ project, index, delay = 0 }: { project: any, index: number, delay?: number }) => {
    const projectId = createProjectId(project.title);
    
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + delay }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="group"
      >
        <Link to={`/projects/${projectId}`} className="block h-full">
          <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full cursor-pointer group-hover:shadow-lg overflow-hidden">
            {project.thumbnail && (
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-card-foreground group-hover:text-primary transition-colors pr-2">
                  {project.title}
                </CardTitle>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge 
                    variant="outline" 
                    className={project.status === 'completed' 
                      ? "bg-green-600/20 text-green-400 border-green-500/50" 
                      : "bg-orange-600/20 text-orange-400 border-orange-500/50"
                    }
                  >
                    {project.status === 'completed' ? '✓' : '⏳'}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
              <CardDescription className="text-muted-foreground">
                {/* @ts-ignore */}
                {project.description[t('lng') === 'en' ? 'en' : 'fr']}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              {project.canvaLink && (
                <div className="mt-4 pt-4 border-t border-border">
                  <a 
                    href={project.canvaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Voir sur Canva
                  </a>
                </div>
              )}
              {project.portfolioLink && (
                <div className="mt-4 pt-4 border-t border-border">
                  <a 
                    href={project.portfolioLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Voir le portfolio V1
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen px-6 py-20 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-8xl font-black mb-4 text-foreground">
            {t('projects.title')}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* In Progress Projects */}
        {inProgressProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-orange-500 mb-8">
              {t('projects.inProgress')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {inProgressProjects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-8">
            {t('projects.completed')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} delay={0.2} />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Projects;
