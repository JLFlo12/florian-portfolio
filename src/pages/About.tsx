
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, FileText } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

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
            {t('about.title')}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {t('about.intro')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">{t('about.educationTitle')}</h2>
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="border-l-4 border-primary pl-6 hover:border-primary/70 hover:pl-8 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground">{t('about.educationDegree')}</h3>
                  <p className="text-muted-foreground">{t('about.educationDescription')}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">{t('about.expertiseTitle')}</h2>
              <div className="space-y-4 text-muted-foreground">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ x: 10 }}
                  className="transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('about.networkTitle')}</h3>
                  <p>{t('about.networkDescription')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ x: 10 }}
                  className="transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('about.systemsTitle')}</h3>
                  <p>{t('about.systemsDescription')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ x: 10 }}
                  className="transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('about.cybersecurityTitle')}</h3>
                  <p>{t('about.cybersecurityDescription')}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* CV Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-8">{t('about.cvTitle')}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/mon-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <Download className="h-5 w-5" />
                {t('about.downloadCV')}
              </a>
              <a
                href="/mon-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-transparent border-2 border-primary hover:bg-primary text-primary hover:text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
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
