
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Database, Shield, Server, Globe, Terminal, FileText, Wifi, HardDrive, Monitor, X } from 'lucide-react';

interface Tool {
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const ToolsSection = () => {
  const { t } = useTranslation();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const tools: Tool[] = [
    { 
      name: 'Wireshark', 
      icon: <Wifi className="h-8 w-8" />, 
      category: 'network',
      description: 'Analyseur de protocoles réseau puissant pour capturer et examiner le trafic réseau en temps réel. Parfait pour le diagnostic et la sécurité réseau.'
    },
    { 
      name: 'GNS3', 
      icon: <Globe className="h-8 w-8" />, 
      category: 'network',
      description: 'Simulateur de réseau graphique permettant de concevoir, construire et tester des topologies réseau complexes virtuellement.'
    },
    { 
      name: 'VMware Workstation', 
      icon: <Monitor className="h-8 w-8" />, 
      category: 'virtualization',
      description: 'Plateforme de virtualisation professionnelle pour exécuter plusieurs systèmes d\'exploitation simultanément sur une seule machine.'
    },
    { 
      name: 'VirtualBox', 
      icon: <HardDrive className="h-8 w-8" />, 
      category: 'virtualization',
      description: 'Solution de virtualisation open-source gratuite d\'Oracle, idéale pour tester différents OS et environnements de développement.'
    },
    { 
      name: 'pfSense', 
      icon: <Shield className="h-8 w-8" />, 
      category: 'security',
      description: 'Pare-feu et routeur open-source basé sur FreeBSD, offrant des fonctionnalités de sécurité réseau avancées et une interface web intuitive.'
    },
    { 
      name: 'Visual Studio Code', 
      icon: <Code className="h-8 w-8" />, 
      category: 'development',
      description: 'Éditeur de code source léger et puissant de Microsoft avec support pour de nombreux langages et extensions.'
    },
    { 
      name: 'Git', 
      icon: <Code className="h-8 w-8" />, 
      category: 'development',
      description: 'Système de contrôle de version distribué pour suivre les modifications du code source et collaborer efficacement en équipe.'
    },
    { 
      name: 'Asterisk', 
      icon: <Globe className="h-8 w-8" />, 
      category: 'telecom',
      description: 'Framework de communication open-source pour créer des solutions de téléphonie IP, PBX et centres d\'appels personnalisés.'
    },
    { 
      name: 'Apache', 
      icon: <Server className="h-8 w-8" />, 
      category: 'server',
      description: 'Serveur web HTTP open-source le plus utilisé au monde, robuste et modulaire pour héberger des sites web et applications.'
    },
    { 
      name: 'Nginx', 
      icon: <Server className="h-8 w-8" />, 
      category: 'server',
      description: 'Serveur web haute performance et proxy inverse, excellent pour servir du contenu statique et équilibrer la charge.'
    },
    { 
      name: 'Raspberry Pi', 
      icon: <HardDrive className="h-8 w-8" />, 
      category: 'hardware',
      description: 'Mini-ordinateur ARM économique parfait pour les projets IoT, domotique, serveurs personnels et apprentissage de l\'informatique.'
    },
    { 
      name: 'Debian', 
      icon: <Terminal className="h-8 w-8" />, 
      category: 'os',
      description: 'Distribution Linux stable et sécurisée, base de nombreuses autres distributions, idéale pour les serveurs et postes de travail.'
    },
    { 
      name: 'Windows Server', 
      icon: <Server className="h-8 w-8" />, 
      category: 'os',
      description: 'Système d\'exploitation serveur de Microsoft avec Active Directory, services réseau intégrés et outils d\'administration avancés.'
    },
    { 
      name: 'Kali Linux', 
      icon: <Shield className="h-8 w-8" />, 
      category: 'security',
      description: 'Distribution Linux spécialisée en sécurité informatique et tests de pénétration, avec plus de 600 outils de sécurité préinstallés.'
    },
    { 
      name: 'FileZilla', 
      icon: <Database className="h-8 w-8" />, 
      category: 'tools',
      description: 'Client FTP/SFTP gratuit et multi-plateforme pour transférer des fichiers entre ordinateurs locaux et serveurs distants.'
    },
    { 
      name: 'Putty', 
      icon: <Terminal className="h-8 w-8" />, 
      category: 'tools',
      description: 'Client SSH/Telnet léger et gratuit pour Windows, permettant la connexion sécurisée aux serveurs et équipements réseau distants.'
    },
    { 
      name: 'Notepad++', 
      icon: <FileText className="h-8 w-8" />, 
      category: 'development',
      description: 'Éditeur de texte et de code source gratuit pour Windows avec coloration syntaxique et support de nombreux langages de programmation.'
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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-muted/20 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">
            {t('home.toolsTitle')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
              onClick={() => setSelectedTool(tool)}
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="flex justify-center mb-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-sm font-medium text-card-foreground group-hover:text-foreground transition-colors duration-300">
                  {tool.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal de description */}
      {selectedTool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTool(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-primary">
                  {selectedTool.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedTool.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {selectedTool.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ToolsSection;
