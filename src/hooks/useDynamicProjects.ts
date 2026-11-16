import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryImage {
  url: string;
  title: string;
  description?: string;
}

export interface DynamicProject {
  id: string;
  title: string;
  description_fr: string;
  description_en: string;
  tags: string[];
  thumbnail_url: string | null;
  slideshow_url: string | null;
  slideshow_type: string;
  status: string;
  detailed_content: any[];
  gallery_images: GalleryImage[];
  display_order: number;
  created_at: string;
}

export const useDynamicProjects = () => {
  return useQuery({
    queryKey: ['dynamic-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects' as any)
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as DynamicProject[];
    },
  });
};

export const useCreateProject = (adminPassword: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Partial<DynamicProject>) => {
      const { data, error } = await supabase.functions.invoke('admin-projects', {
        headers: { 'x-admin-password': adminPassword },
        body: { action: 'create', ...project },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dynamic-projects'] }),
  });
};

export const useUpdateProject = (adminPassword: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Partial<DynamicProject> & { id: string }) => {
      const { data, error } = await supabase.functions.invoke('admin-projects', {
        headers: { 'x-admin-password': adminPassword },
        body: { action: 'update', ...project },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dynamic-projects'] }),
  });
};

export const useDeleteProject = (adminPassword: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('admin-projects', {
        headers: { 'x-admin-password': adminPassword },
        body: { action: 'delete', id },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dynamic-projects'] }),
  });
};

export const uploadThumbnail = async (file: File, adminPassword: string): Promise<string> => {
  const { data: signed, error: signingError } = await supabase.functions.invoke('admin-projects', {
    headers: { 'x-admin-password': adminPassword },
    body: { action: 'upload-url', fileName: file.name, contentType: file.type },
  });
  if (signingError) throw signingError;
  if (!signed?.path || !signed?.token || !signed?.publicUrl) throw new Error('Upload authorization failed');
  const { error } = await supabase.storage
    .from('project-thumbnails')
    .uploadToSignedUrl(signed.path, signed.token, file, { contentType: file.type });
  if (error) throw error;
  return signed.publicUrl;
};
