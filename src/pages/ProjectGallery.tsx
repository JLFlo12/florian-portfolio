
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { getProjectGallery } from '@/data/projectGalleries';

// Liens Canva pour chaque projet
const canvaLinks: { [key: string]: string } = {
  'hygiene-cybersecurite': 'https://www.canva.com/design/DAGR75eU94c/lgzMFgPQ42BKlzcXY9N0mw/view',
  'pilotage-de-led-avec-raspberry-pi': 'https://www.canva.com/design/DAGdTMt714c/HsmxLn-e2kNvwDFtxLDwhg/edit',
  'analyse-de-transmission-wifi': 'https://www.canva.com/design/DAGdsXFIEP0/vEx7owRuxu67lumBODcDQg/edit?utm_content=DAGdsXFIEP0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  'mesure-et-caracterisation-dun-signal': 'https://www.canva.com/design/DAGqmUrS6yE/xnbNcz-UEiyQwCQW5gZ1HQ/edit',
  'projet-integratif--topologie-centralisee--succursale-gns3': 'https://www.canva.com/design/DAGqmUrS6yE/xnbNcz-UEiyQwCQW5gZ1HQ/edit',
  'creation-dun-site-web-de-suivi-de-commande': 'https://www.canva.com/design/DAGjpZz6DBo/KOSw2rqbdxCLlwOk5y6p8Q/edit'
};

const ProjectGallery = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  
  const gallery = projectId ? getProjectGallery(projectId) : undefined;
  const canvaLink = projectId ? canvaLinks[projectId] : undefined;

  if (!gallery) {
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

        {/* Galerie de photos */}
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
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
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

        {/* Message si pas d'images */}
        {gallery.images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              Aucune image disponible pour ce projet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;
