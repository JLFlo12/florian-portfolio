
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Database, Shield, Server, Globe, Terminal, FileText, Wifi, HardDrive, Monitor } from 'lucide-react';

interface Tool {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const ToolsSection = () => {
  const { t } = useTranslation();

  const tools: Tool[] = [
    { name: 'Wireshark', icon: <Wifi className="h-8 w-8" />, category: 'network' },
    { name: 'GNS3', icon: <Globe className="h-8 w-8" />, category: 'network' },
    { name: 'VMware Workstation', icon: <Monitor className="h-8 w-8" />, category: 'virtualization' },
    { name: 'VirtualBox', icon: <HardDrive className="h-8 w-8" />, category: 'virtualization' },
    { name: 'pfSense', icon: <Shield className="h-8 w-8" />, category: 'security' },
    { name: 'Visual Studio Code', icon: <Code className="h-8 w-8" />, category: 'development' },
    { name: 'Git', icon: <Code className="h-8 w-8" />, category: 'development' },
    { name: 'Asterisk', icon: <Globe className="h-8 w-8" />, category: 'telecom' },
    { name: 'Apache', icon: <Server className="h-8 w-8" />, category: 'server' },
    { name: 'Nginx', icon: <Server className="h-8 w-8" />, category: 'server' },
    { name: 'Raspberry Pi', icon: <HardDrive className="h-8 w-8" />, category: 'hardware' },
    { name: 'Debian', icon: <Terminal className="h-8 w-8" />, category: 'os' },
    { name: 'Windows Server', icon: <Server className="h-8 w-8" />, category: 'os' },
    { name: 'Kali Linux', icon: <Shield className="h-8 w-8" />, category: 'security' },
    { name: 'FileZilla', icon: <Database className="h-8 w-8" />, category: 'tools' },
    { name: 'Putty', icon: <Terminal className="h-8 w-8" />, category: 'tools' },
    { name: 'Notepad++', icon: <FileText className="h-8 w-8" />, category: 'development' }
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
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-purple-400">
            {t('home.toolsTitle')}
          </h2>
          <div className="w-24 h-1 bg-purple-400 mx-auto"></div>
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
              className="group"
            >
              <div className="bg-gray-800/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-700/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                <div className="flex justify-center mb-3 text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                  {tool.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
