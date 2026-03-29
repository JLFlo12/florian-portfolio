
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Plus, Trash2, Lock, LogOut, Pencil } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useDynamicProjects, useCreateProject, useUpdateProject, useDeleteProject, DynamicProject } from '@/hooks/useDynamicProjects';
import AdminLoginDialog from '@/components/admin/AdminLoginDialog';
import ProjectFormDialog from '@/components/admin/ProjectFormDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Projects = () => {
  const { t } = useTranslation();
  const { isAdmin, adminPassword, login, logout } = useAdminAuth();
  const { data: dynamicProjects = [] } = useDynamicProjects();
  const createProject = useCreateProject(adminPassword);
  const updateProject = useUpdateProject(adminPassword);
  const deleteProject = useDeleteProject(adminPassword);

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<DynamicProject | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const inProgressProjects = dynamicProjects.filter(p => p.status === 'inProgress');
  const completedProjects = dynamicProjects.filter(p => p.status === 'completed');

  const ProjectCard = ({ project, index, delay = 0 }: { project: DynamicProject; index: number; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 + delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative"
    >
      <Link to={`/projects/dynamic-${project.id}`} className="block h-full">
        <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full cursor-pointer group-hover:shadow-lg overflow-hidden">
          {project.thumbnail_url && (
            <div className="w-full h-48 overflow-hidden">
              <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-card-foreground group-hover:text-primary transition-colors pr-2">{project.title}</CardTitle>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Badge variant="outline" className={project.status === 'completed' ? "bg-green-600/20 text-green-400 border-green-500/50" : "bg-orange-600/20 text-orange-400 border-orange-500/50"}>
                  {project.status === 'completed' ? '✓' : '⏳'}
                </Badge>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <CardDescription className="text-muted-foreground">
              {t('lng') === 'en' ? project.description_en : project.description_fr}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">{tag}</Badge>
              ))}
            </div>
            {project.slideshow_url && (
              <div className="mt-4 pt-4 border-t border-border">
                <a href={project.slideshow_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="h-3 w-3 mr-1" />Voir la présentation
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingProject(project); setShowFormDialog(true); }}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" className="h-8 w-8" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDeletingProjectId(project.id); }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );

  const handleCreateOrUpdate = async (data: Partial<DynamicProject>) => {
    if (editingProject) {
      await updateProject.mutateAsync({ ...data, id: editingProject.id } as any);
    } else {
      await createProject.mutateAsync(data);
    }
    setShowFormDialog(false);
    setEditingProject(null);
  };

  const handleDelete = async () => {
    if (deletingProjectId) {
      await deleteProject.mutateAsync(deletingProjectId);
      setDeletingProjectId(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-20 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-8xl font-black mb-4 text-foreground">{t('projects.title')}</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>

          {/* Admin controls */}
          <div className="flex justify-center gap-3">
            {!isAdmin ? (
              <Button variant="outline" size="sm" onClick={() => setShowLoginDialog(true)} className="gap-2">
                <Lock className="h-4 w-4" /> Mode admin
              </Button>
            ) : (
              <>
                <Button size="sm" onClick={() => { setEditingProject(null); setShowFormDialog(true); }} className="gap-2">
                  <Plus className="h-4 w-4" /> Ajouter un projet
                </Button>
                <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" /> Déconnexion
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* In Progress Projects */}
        {inProgressProjects.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-16">
            <h2 className="text-4xl font-bold text-orange-500 mb-8">{t('projects.inProgress')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {inProgressProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8">{t('projects.completed')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {completedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} delay={0.2} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Dialogs */}
      <AdminLoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} onLogin={login} />
      <ProjectFormDialog
        open={showFormDialog}
        onOpenChange={(open) => { setShowFormDialog(open); if (!open) setEditingProject(null); }}
        onSubmit={handleCreateOrUpdate}
        project={editingProject}
        loading={createProject.isPending || updateProject.isPending}
      />
      <AlertDialog open={!!deletingProjectId} onOpenChange={(open) => { if (!open) setDeletingProjectId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Projects;
