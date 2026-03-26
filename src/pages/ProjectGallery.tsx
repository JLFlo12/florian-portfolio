
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Download, FileText, Code, Palette, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { getProjectGallery, ProjectFile } from '@/data/projectGalleries';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Liens Canva pour chaque projet
const canvaLinks: { [key: string]: string } = {
  'hygiene-cybersecurite': 'https://www.canva.com/design/DAGR75eU94c/lgzMFgPQ42BKlzcXY9N0mw/view',
  'pilotage-de-led-avec-raspberry-pi': 'https://www.canva.com/design/DAGdTMt714c/HsmxLn-e2kNvwDFtxLDwhg/edit',
  'analyse-de-transmission-wifi': 'https://www.canva.com/design/DAGdsXFIEP0/vEx7owRuxu67lumBODcDQg/edit?utm_content=DAGdsXFIEP0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  'mesure-et-caracterisation-dun-signal': 'https://www.canva.com/design/DAGqmUrS6yE/xnbNcz-UEiyQwCQW5gZ1HQ/edit',
  'projet-integratif--topologie-centralisee--succursale-gns3': 'https://www.canva.com/design/DAGqmUrS6yE/xnbNcz-UEiyQwCQW5gZ1HQ/edit',
  'creation-dun-site-web-de-suivi-de-commande': 'https://www.canva.com/design/DAGjpZz6DBo/KOSw2rqbdxCLlwOk5y6p8Q/edit',
  'des-jeux-pour-professionnels-du-btiment': 'https://gamma.app/docs/Des-Jeux-pour-Professionnels-du-Batiment-h5a4244sqx07syb'
};

const ProjectGallery = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  
  const isDynamic = projectId?.startsWith('dynamic-');
  const dynamicId = isDynamic ? projectId.replace('dynamic-', '') : null;
  
  const { data: dynamicProject } = useQuery({
    queryKey: ['dynamic-project', dynamicId],
    enabled: !!dynamicId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects' as any)
        .select('*')
        .eq('id', dynamicId!)
        .single();
      if (error) throw error;
      return data as any;
    },
  });
  
  const gallery = !isDynamic && projectId ? getProjectGallery(projectId) : undefined;
  const canvaLink = !isDynamic && projectId ? canvaLinks[projectId] : undefined;

  // Fonction pour obtenir l'icône selon le type de fichier
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'html':
        return <FileText className="h-5 w-5" />;
      case 'css':
        return <Palette className="h-5 w-5" />;
      case 'js':
        return <Code className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Composant pour afficher un fichier
  const FileCard = ({ file, index }: { file: ProjectFile; index: number }) => (
    <motion.div
      key={file.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-primary">
                {getFileIcon(file.type)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {file.title}
                </h3>
                {file.description && (
                  <p className="text-muted-foreground text-sm mt-1">
                    {file.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <a 
                href={file.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a 
                href={file.url} 
                download
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Dynamic project view
  if (isDynamic && dynamicProject) {
    const details = dynamicProject.detailed_content || [];
    return (
      <div className="min-h-screen px-6 py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12">
            <Link to="/projects" className="inline-block mb-6">
              <Button variant="outline" className="bg-background hover:bg-accent text-foreground border-border">
                <ArrowLeft className="h-4 w-4 mr-2" />Retour aux projets
              </Button>
            </Link>
            <h1 className="text-4xl lg:text-6xl font-black mb-4 text-foreground">{dynamicProject.title}</h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              {t('lng') === 'en' ? dynamicProject.description_en : dynamicProject.description_fr}
            </p>
            {dynamicProject.slideshow_url && (
              <div className="mb-8">
                <a href={dynamicProject.slideshow_url} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />Voir la présentation
                  </Button>
                </a>
                <div className="mt-6">
                  <iframe
                    src={dynamicProject.slideshow_url.includes('/edit') ? dynamicProject.slideshow_url.replace('/edit', '/view?embed') : dynamicProject.slideshow_url + '?embed'}
                    className="w-full h-96 border border-border rounded-lg"
                    title={dynamicProject.title}
                  />
                </div>
              </div>
            )}
          </motion.div>
          {details.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Détails du projet</h2>
              <div className="space-y-6">
                {details.map((detail: any, index: number) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-primary">{detail.section}</h3>
                        <ul className="space-y-2">
                          {detail.content.map((item: string, i: number) => (
                            <li key={i} className="text-muted-foreground leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {dynamicProject.thumbnail_url && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-12">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Image du projet</h2>
              <img src={dynamicProject.thumbnail_url} alt={dynamicProject.title} className="w-full max-w-2xl rounded-lg border border-border" />
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (!gallery && !dynamicProject) {
    return (
      <div className="min-h-screen px-6 py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Projet non trouvé
          </h1>
          <Link to="/projects">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux projets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!gallery) return null;

  return (
    <div className="min-h-screen px-6 py-20 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header avec bouton retour */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link to="/projects" className="inline-block mb-6">
            <Button 
              variant="outline" 
              className="bg-background hover:bg-accent text-foreground border-border"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux projets
            </Button>
          </Link>
          
          <h1 className="text-4xl lg:text-6xl font-black mb-4 text-foreground">
            {gallery.projectTitle}
          </h1>
          <div className="w-24 h-1 bg-primary mb-6"></div>
          
          {/* Lien Canva si disponible */}
          {canvaLink && (
            <div className="mb-8">
              <a 
                href={canvaLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Voir sur Canva
                </Button>
              </a>
              
              {/* Intégration Canva optionnelle */}
              <div className="mt-6">
                <iframe
                  src={canvaLink.replace('/edit', '/view').replace('/view', '/view?embed')}
                  className="w-full h-96 border border-border rounded-lg"
                  title={gallery.projectTitle}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Section des détails du projet si disponibles */}
        {gallery.details && gallery.details.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Plan d'action du projet
            </h2>
            <div className="space-y-6">
              {gallery.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-primary">
                        {detail.section}
                      </h3>
                      <ul className="space-y-2">
                        {detail.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section des fichiers si disponibles */}
        {gallery.files && gallery.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Fichiers du projet
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {gallery.files.map((file, index) => (
                <FileCard key={file.id} file={file} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Galerie de photos */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Images du projet
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {image.url ? (
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-64 bg-muted/50 flex flex-col items-center justify-center gap-2 border-b border-border">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                        <span className="text-sm text-muted-foreground/60">Image à venir</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {image.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </div>
        </motion.div>

        {/* Message si pas d'images */}
        {gallery.images.length === 0 && (!gallery.files || gallery.files.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              Aucun contenu disponible pour ce projet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;
