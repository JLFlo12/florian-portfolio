import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import ToolsSection from '@/components/ToolsSection';
import RotatingGlobe from '@/components/RotatingGlobe';

const Home = () => {
  const { t } = useTranslation();

  const getLevelLabel = (level: string) => {
    const labels: Record<string, { text: string; color: string }> = {
      'maitrise': { text: 'Maîtrisé', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'avance': { text: 'Avancé', color: 'bg-primary/20 text-primary border-primary/30' },
      'base': { text: 'Base', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'fragile': { text: 'Fragile', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
    };
    return labels[level] || labels['base'];
  };

  const technicalSkills = [
    { name: 'Réseaux & GNS3', level: 'maitrise' },
    { name: 'Linux/Windows Server', level: 'maitrise' },
    { name: 'JavaScript/TypeScript', level: 'avance' },
    { name: 'PHP & SQL', level: 'avance' },
    { name: 'Cybersécurité', level: 'fragile' },
    { name: 'Virtualisation', level: 'maitrise' }
  ];

  const softSkills = [
    { name: 'Leadership', level: 'base' },
    { name: 'Communication', level: 'avance' },
    { name: 'Travail d\'équipe', level: 'maitrise' },
    { name: 'Discipline', level: 'maitrise' },
    { name: 'Esprit critique', level: 'avance' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-6xl lg:text-8xl font-black leading-none text-foreground"
                >
                  FLORIAN
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-2xl lg:text-3xl font-light tracking-[0.3em] text-muted-foreground"
                >
                  GIRARDOT LAHOGUE
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl lg:text-2xl text-primary font-medium"
                  style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.3)' }}
                >
                  {t('home.role')}
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg text-muted-foreground max-w-md leading-relaxed"
              >
                {t('home.bio')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <MapPin className="h-5 w-5" />
                <span>{t('home.location')}</span>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex items-center space-x-4"
              >
                <a
                  href="mailto:f.girardot--lahogue@rt-iut.re"
                  className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/JLFlo12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/florian-girardot-lahogue-4aa367341/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Link to="/projects">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                    {t('home.cta')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Rotating Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center"
            >
              <RotatingGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <ToolsSection />

      {/* Skills Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-primary">
                {t('home.skillsTitle')}
              </h2>
              <div className="space-y-4">
                {technicalSkills.map((skill, index) => {
                  const levelInfo = getLevelLabel(skill.level);
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50"
                    >
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelInfo.color}`}>
                        {levelInfo.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-primary">
                {t('home.softSkillsTitle')}
              </h2>
              <div className="space-y-4">
                {softSkills.map((skill, index) => {
                  const levelInfo = getLevelLabel(skill.level);
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50"
                    >
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelInfo.color}`}>
                        {levelInfo.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Copyright Footer */}
      <footer className="py-8 px-6 bg-muted/10 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground text-sm"
          >
            © 2025 GIRARDOT LAHOGUE Florian. Tous droits réservés.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
