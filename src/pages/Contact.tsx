
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
      color: 'text-primary'
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: 'github.com/JLFlo12',
      href: 'https://github.com/JLFlo12',
      color: 'text-muted-foreground'
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'linkedin.com/in/florian-girardot-lahogue-4aa367341',
      href: 'https://www.linkedin.com/in/florian-girardot-lahogue-4aa367341/',
      color: 'text-blue-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'La Réunion, France',
      href: '#',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="min-h-screen px-6 py-20 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-8xl font-black mb-4 text-foreground">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('contact.subtitle')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : '_self'}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group block"
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex p-4 rounded-full bg-muted group-hover:bg-accent transition-colors mx-auto">
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors break-all">
                    {method.value}
                  </span>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="bg-gradient-to-r from-primary/20 to-orange-primary-600/20 rounded-lg p-8 border border-primary/20 overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <motion.h2 
                className="text-2xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                Prêt à collaborer ?
              </motion.h2>
              <motion.p 
                className="text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
              </motion.p>
              <motion.a
                href="mailto:f.girardot--lahogue@rt-iut.re"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                <Mail className="h-5 w-5" />
                <span>Envoyer un message</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
