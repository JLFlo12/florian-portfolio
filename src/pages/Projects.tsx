
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const { t, i18n } = useTranslation();

  const completedProjects = [
    {
      title: 'Hygiène et cybersécurité',
      titleEn: 'IT Hygiene and Cybersecurity',
      description: 'Apprentissage des bonnes pratiques de sécurité (mots de passe, antivirus, pare-feu, etc.)',
      descriptionEn: 'Awareness training on cybersecurity and IT hygiene best practices',
      tags: ['Cybersécurité', 'Formation', 'Bonnes pratiques']
    },
    {
      title: 'Pilotage de LED avec Raspberry Pi',
      titleEn: 'LED Control with Raspberry Pi',
      description: 'Contrôle de LED à distance via un serveur web sur Raspberry Pi',
      descriptionEn: 'Remote LED control using a Raspberry Pi and a web interface',
      tags: ['Raspberry Pi', 'IoT', 'Web', 'Python']
    },
    {
      title: 'Analyse de transmission WiFi',
      titleEn: 'WiFi Transmission Analysis',
      description: 'Étude de la puissance des signaux WiFi avec WiFi Analyzer et documentation des résultats',
      descriptionEn: 'Measuring WiFi signal strength using WiFi Analyzer',
      tags: ['WiFi', 'Analyse', 'Réseaux']
    },
    {
      title: 'Création d\'un portfolio personnel',
      titleEn: 'Personal Portfolio Creation',
      description: 'Premier site portfolio simple en HTML/CSS/JS',
      descriptionEn: 'First personal portfolio website using HTML/CSS/JS',
      tags: ['HTML', 'CSS', 'JavaScript', 'Web']
    }
  ];

  const inProgressProjects = [
    {
      title: 'Réseau pour petite entreprise (GNS3)',
      titleEn: 'Small Business Network (GNS3)',
      description: 'Conception d\'une infrastructure réseau complète dans GNS3 avec routage, VLAN, NAT, etc.',
      descriptionEn: 'Building a full small-business network in GNS3 (VLAN, routing, NAT...)',
      tags: ['GNS3', 'Réseaux', 'VLAN', 'Routage']
    },
    {
      title: 'Mesure et caractérisation d\'un signal',
      titleEn: 'Signal Measurement and Characterization',
      description: 'Analyse de signaux physiques à l\'oscilloscope, calcul de fréquence et d\'amplitude',
      descriptionEn: 'Signal analysis with oscilloscope, frequency and amplitude measurement',
      tags: ['Oscilloscope', 'Signaux', 'Mesures']
    },
    {
      title: 'Projet intégratif : Topologie centralisée + succursale (GNS3)',
      titleEn: 'Integrative Project: Centralized + Branch Topology (GNS3)',
      description: 'Réseau GNS3 simulant un site principal et une succursale interconnectée',
      descriptionEn: 'Simulated GNS3 network with a main site and a remote branch',
      tags: ['GNS3', 'Topologie', 'Réseau d\'entreprise']
    },
    {
      title: 'Création d\'un site web de suivi de commande',
      titleEn: 'Order Tracking Website Creation',
      description: 'Développement d\'une web app permettant la gestion et le suivi de commandes, triées par statut, type et fournisseur',
      descriptionEn: 'Order tracking web app with filtering by status, type, and supplier',
      tags: ['Web App', 'PHP', 'SQL', 'Gestion']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-8xl font-black mb-4">
            {t('projects.title')}
          </h1>
          <div className="w-24 h-1 bg-purple-400 mx-auto"></div>
        </motion.div>

        {/* Completed Projects */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 text-purple-400"
          >
            ✅ {t('projects.completed')}
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {completedProjects.map((project, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-colors group">
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                      {i18n.language === 'fr' ? project.title : project.titleEn}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {i18n.language === 'fr' ? project.description : project.descriptionEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-purple-600/20 text-purple-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* In Progress Projects */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 text-orange-400"
          >
            🔧 {t('projects.inProgress')}
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {inProgressProjects.map((project, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors group">
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-orange-400 transition-colors">
                      {i18n.language === 'fr' ? project.title : project.titleEn}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {i18n.language === 'fr' ? project.description : project.descriptionEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-orange-600/20 text-orange-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
