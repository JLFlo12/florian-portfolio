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

  const technicalSkills = [
    { name: 'Réseaux & GNS3', level: 85 },
    { name: 'Linux/Windows Server', level: 80 },
    { name: 'JavaScript/TypeScript', level: 75 },
    { name: 'PHP & SQL', level: 70 },
    { name: 'Cybersécurité', level: 25 },
    { name: 'Virtualisation', level: 80 }
  ];

  const softSkills = [
    { name: 'Leadership', level: 45 },
    { name: 'Communication', level: 60 },
    { name: 'Travail d\'équipe', level: 80 },
    { name: 'Discipline', level: 90 },
    { name: 'Esprit critique', level: 65 }
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
              <div className="space-y-4">
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
                  className="text-2xl lg:text-3xl font-light tracking-[0.3em] text-muted-foreground -mt-2"
                >
                  GIRARDOT LAHOGUE
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl lg:text-2xl text-primary font-medium"
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
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
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
              <div className="space-y-6">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
