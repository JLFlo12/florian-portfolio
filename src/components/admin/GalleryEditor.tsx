import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Upload, Save, X, Pencil, GripVertical } from 'lucide-react';
import { uploadThumbnail, GalleryImage } from '@/hooks/useDynamicProjects';
import { toast } from 'sonner';

interface GalleryEditorProps {
  projectId: string;
  detailedContent: any[];
  galleryImages: GalleryImage[];
  onSave: (data: { detailed_content: any[]; gallery_images: GalleryImage[] }) => Promise<void>;
}

const GalleryEditor = ({ projectId, detailedContent, galleryImages, onSave }: GalleryEditorProps) => {
  const [sections, setSections] = useState<any[]>(detailedContent || []);
  const [images, setImages] = useState<GalleryImage[]>(galleryImages || []);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Section editing
  const addSection = () => {
    setSections([...sections, { section: '', content: [''] }]);
  };

  const updateSectionTitle = (index: number, title: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], section: title };
    setSections(updated);
  };

  const updateSectionContent = (sIndex: number, text: string) => {
    const updated = [...sections];
    updated[sIndex] = { ...updated[sIndex], content: text.split('\n') };
    setSections(updated);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // Image editing
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadThumbnail(file);
        setImages(prev => [...prev, { url, title: file.name.replace(/\.[^.]+$/, ''), description: '' }]);
      }
      toast.success('Image(s) uploadée(s)');
    } catch (err) {
      toast.error("Erreur lors de l'upload");
      console.error(err);
    }
    setUploading(false);
  };

  const updateImage = (index: number, field: keyof GalleryImage, value: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [field]: value };
    setImages(updated);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ detailed_content: sections, gallery_images: images });
      toast.success('Projet mis à jour');
    } catch {
      toast.error('Erreur lors de la sauvegarde');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 mt-8 border-t border-border pt-8">
      {/* Sections Editor */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Sections du projet</h2>
          <Button size="sm" variant="outline" onClick={addSection} className="gap-2">
            <Plus className="h-4 w-4" /> Ajouter une section
          </Button>
        </div>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    value={section.section}
                    onChange={(e) => updateSectionTitle(index, e.target.value)}
                    placeholder="Titre de la section"
                    className="font-semibold"
                  />
                  <Button size="icon" variant="destructive" className="h-8 w-8 shrink-0" onClick={() => removeSection(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={section.content?.join('\n') || ''}
                  onChange={(e) => updateSectionContent(index, e.target.value)}
                  placeholder="Contenu (une ligne par élément)"
                  rows={4}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Images Editor */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Images du projet</h2>
          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80">
            <Upload className="h-4 w-4" />
            {uploading ? 'Upload...' : 'Ajouter des images'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="bg-card border-border overflow-hidden">
              <div className="relative">
                <img src={image.url} alt={image.title} className="w-full h-40 object-cover" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <CardContent className="p-3 space-y-2">
                <Input
                  value={image.title}
                  onChange={(e) => updateImage(index, 'title', e.target.value)}
                  placeholder="Titre"
                  className="text-sm"
                />
                <Input
                  value={image.description || ''}
                  onChange={(e) => updateImage(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="text-sm"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2 px-8">
          <Save className="h-4 w-4" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
        </Button>
      </div>
    </div>
  );
};

export default GalleryEditor;
