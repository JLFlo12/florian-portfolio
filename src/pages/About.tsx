
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
            À Propos
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
            Étudiant passionné par les technologies réseau et la cybersécurité
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
        </motion.div>
      </div>
    </div>
  );
};

export default About;
