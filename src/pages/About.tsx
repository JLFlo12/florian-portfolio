
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, FileText } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-8xl font-black mb-4">
            {t('about.title')}
          </h1>
          <div className="w-24 h-1 bg-purple-400 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {t('about.intro')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Formation</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold text-white">BUT Réseaux & Télécommunications</h3>
                  <p className="text-gray-400">En cours - Spécialisation en cybersécurité et administration réseau</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Expertise</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Réseaux</h3>
                  <p>Configuration et administration de réseaux d'entreprise, VLAN, routage dynamique et statique</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Systèmes</h3>
                  <p>Administration Linux/Windows Server, virtualisation, conteneurisation</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Cybersécurité</h3>
                  <p>Analyse de vulnérabilités, hardening système, sensibilisation aux bonnes pratiques</p>
                </div>
              </div>
            </div>
          </div>

          {/* CV Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold text-purple-400 mb-8">{t('about.cvTitle')}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/mon-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Download className="h-5 w-5" />
                {t('about.downloadCV')}
              </a>
              <a
                href="/mon-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-transparent border-2 border-purple-400 hover:bg-purple-400 text-purple-400 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                {t('about.viewCV')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
