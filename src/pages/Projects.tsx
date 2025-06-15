
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

  const completedProjects = [
    {
      title: 'Hygiène et cybersécurité',
      description: {
        fr: 'Apprentissage des bonnes pratiques de sécurité (mots de passe, antivirus, pare-feu, etc.)',
        en: 'Awareness training on cybersecurity and IT hygiene best practices'
      },
      status: 'completed',
      technologies: ['Sécurité', 'Formation']
    },
    {
      title: 'Pilotage de LED avec Raspberry Pi',
      description: {
        fr: 'Contrôle de LED à distance via un serveur web sur Raspberry Pi',
        en: 'Remote LED control using a Raspberry Pi and a web interface'
      },
      status: 'completed',
      technologies: ['Raspberry Pi', 'Python', 'GPIO']
    },
    {
      title: 'Analyse de transmission WiFi',
      description: {
        fr: 'Étude de la puissance des signaux WiFi avec WiFi Analyzer et documentation des résultats',
        en: 'Measuring WiFi signal strength using WiFi Analyzer'
      },
      status: 'completed',
      technologies: ['WiFi', 'Analyse', 'Documentation']
    },
    {
      title: 'Création d\'un portfolio personnel',
      description: {
        fr: 'Premier site portfolio simple en HTML/CSS/JS',
        en: 'First personal portfolio website using HTML/CSS/JS'
      },
      status: 'completed',
      technologies: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  const inProgressProjects = [
    {
      title: 'Réseau pour petite entreprise (GNS3)',
      description: {
        fr: 'Conception d\'une infrastructure réseau complète dans GNS3 avec routage, VLAN, NAT, etc.',
        en: 'Building a full small-business network in GNS3 (VLAN, routing, NAT...)'
      },
      status: 'in-progress',
      technologies: ['GNS3', 'VLAN', 'Routage', 'NAT']
    },
    {
      title: 'Mesure et caractérisation d\'un signal',
      description: {
        fr: 'Analyse de signaux physiques à l\'oscilloscope, calcul de fréquence et d\'amplitude',
        en: 'Signal analysis with oscilloscope, frequency and amplitude measurement'
      },
      status: 'in-progress',
      technologies: ['Oscilloscope', 'Analyse', 'Signaux']
    },
    {
      title: 'Projet intégratif : Topologie centralisée + succursale (GNS3)',
      description: {
        fr: 'Réseau GNS3 simulant un site principal et une succursale interconnectée',
        en: 'Simulated GNS3 network with a main site and a remote branch'
      },
      status: 'in-progress',
      technologies: ['GNS3', 'Topologie', 'Interconnexion']
    },
    {
      title: 'Création d\'un site web de suivi de commande',
      description: {
        fr: 'Développement d\'une web app permettant la gestion et le suivi de commandes, triées par statut, type et fournisseur',
        en: 'Order tracking web app with filtering by status, type, and supplier'
      },
      status: 'in-progress',
      technologies: ['React', 'TypeScript', 'Base de données']
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
          <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full cursor-pointer group-hover:shadow-lg">
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
              <div className="flex flex-wrap gap-2">
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

        {/* Completed Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-8">
            {t('projects.completed')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* In Progress Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-8">
            {t('projects.inProgress')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {inProgressProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} delay={0.4} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
