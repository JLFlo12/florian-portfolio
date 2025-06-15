
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'f.girardot--lahogue@rt-iut.re',
      href: 'mailto:f.girardot--lahogue@rt-iut.re',
      color: 'text-purple-400'
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: 'github.com/JLFlo12',
      href: 'https://github.com/JLFlo12',
      color: 'text-gray-400'
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'linkedin.com/in/florian-girardot-lahogue-4aa367341',
      href: 'https://www.linkedin.com/in/florian-girardot-lahogue-4aa367341/',
      color: 'text-blue-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'La Réunion, France',
      href: '#',
      color: 'text-green-400'
    }
  ];

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
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-400">
            {t('contact.subtitle')}
          </p>
          <div className="w-24 h-1 bg-purple-400 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-4 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors`}>
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                    {method.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="text-gray-400 hover:text-white transition-colors break-all"
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Prêt à collaborer ?
            </h2>
            <p className="text-gray-400 mb-6">
              N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
            </p>
            <a
              href="mailto:f.girardot--lahogue@rt-iut.re"
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Envoyer un message</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
