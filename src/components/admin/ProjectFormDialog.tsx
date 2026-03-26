import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, Plus } from 'lucide-react';
import { uploadThumbnail, DynamicProject } from '@/hooks/useDynamicProjects';

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (project: Partial<DynamicProject>) => void;
  project?: DynamicProject | null;
  loading?: boolean;
}

const ProjectFormDialog = ({ open, onOpenChange, onSubmit, project, loading }: ProjectFormDialogProps) => {
  const [title, setTitle] = useState('');
  const [descFr, setDescFr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState('completed');
  const [slideshowUrl, setSlideshowUrl] = useState('');
  const [slideshowType, setSlideshowType] = useState('canva');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [detailedContent, setDetailedContent] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescFr(project.description_fr);
      setDescEn(project.description_en);
      setTags(project.tags || []);
      setStatus(project.status);
      setSlideshowUrl(project.slideshow_url || '');
      setSlideshowType(project.slideshow_type || 'canva');
      setThumbnailUrl(project.thumbnail_url || '');
      setDetailedContent(
        project.detailed_content
          ? project.detailed_content.map((s: any) => `## ${s.section}\n${s.content.join('\n')}`).join('\n\n')
          : ''
      );
    } else {
      setTitle('');
      setDescFr('');
      setDescEn('');
      setTags([]);
      setStatus('completed');
      setSlideshowUrl('');
      setSlideshowType('canva');
      setThumbnailUrl('');
      setDetailedContent('');
    }
  }, [project, open]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadThumbnail(file);
      setThumbnailUrl(url);
    } catch (err) {
      console.error('Upload error:', err);
    }
    setUploading(false);
  };

  const parseDetailedContent = (text: string) => {
    if (!text.trim()) return [];
    const sections = text.split(/^## /gm).filter(Boolean);
    return sections.map(section => {
      const lines = section.split('\n');
      const sectionTitle = lines[0]?.trim() || '';
      const content = lines.slice(1).filter(l => l.trim());
      return { section: sectionTitle, content };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...(project?.id ? { id: project.id } : {}),
      title,
      description_fr: descFr,
      description_en: descEn,
      tags,
      status,
      slideshow_url: slideshowUrl || null,
      slideshow_type: slideshowType,
      thumbnail_url: thumbnailUrl || null,
      detailed_content: parseDetailedContent(detailedContent),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Modifier le projet' : 'Nouveau projet'}</DialogTitle>
          <DialogDescription>
            {project ? 'Modifiez les informations du projet.' : 'Remplissez les informations pour créer un nouveau projet.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Titre</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description (FR)</label>
            <Textarea value={descFr} onChange={(e) => setDescFr(e.target.value)} rows={2} />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description (EN)</label>
            <Textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={2} />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Statut</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="inProgress">En cours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Ajouter un tag"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              />
              <Button type="button" size="sm" onClick={addTag}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Miniature</label>
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="miniature" className="w-32 h-20 object-cover rounded mb-2" />
            )}
            <div className="flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80">
                <Upload className="h-4 w-4" />
                {uploading ? 'Upload...' : 'Choisir une image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
              </label>
              <Input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Ou coller une URL"
                className="flex-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Type de diapo</label>
              <Select value={slideshowType} onValueChange={setSlideshowType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="canva">Canva</SelectItem>
                  <SelectItem value="gamma">Gamma</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Lien de la diapo</label>
              <Input value={slideshowUrl} onChange={(e) => setSlideshowUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Contenu détaillé (format : ## Titre de section puis lignes de contenu)
            </label>
            <Textarea value={detailedContent} onChange={(e) => setDetailedContent(e.target.value)} rows={8} placeholder={"## Informations générales\nLigne 1\nLigne 2\n\n## Concept\nDescription du concept..."} />
          </div>

          <Button type="submit" className="w-full" disabled={loading || uploading}>
            {loading ? 'Enregistrement...' : project ? 'Mettre à jour' : 'Créer le projet'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
