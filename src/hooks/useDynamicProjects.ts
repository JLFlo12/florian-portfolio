import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase.functions.invoke('admin-projects?action=update', {
        method: 'PUT',
        headers: { 'x-admin-password': adminPassword },
        body: project,
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
      const { data, error } = await supabase.functions.invoke('admin-projects?action=delete', {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword },
        body: { id },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dynamic-projects'] }),
  });
};

export const uploadThumbnail = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from('project-thumbnails')
    .upload(fileName, file);
  if (error) throw error;
  const { data } = supabase.storage
    .from('project-thumbnails')
    .getPublicUrl(fileName);
  return data.publicUrl;
};
