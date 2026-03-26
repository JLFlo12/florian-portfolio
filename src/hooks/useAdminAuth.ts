import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const login = useCallback(async (password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-projects', {
        headers: { 'x-admin-password': password },
        body: {},
      });
      
      // Check for function invoke error or HTTP error
      if (error) return false;
      
      // The response from edge function with verify action
      const response = await supabase.functions.invoke('admin-projects?action=verify', {
        headers: { 'x-admin-password': password },
        body: {},
      });
      
      if (response.error) return false;
      if (response.data?.success) {
        setIsAdmin(true);
        setAdminPassword(password);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setAdminPassword('');
  }, []);

  return { isAdmin, adminPassword, login, logout };
};
