'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser,clearIsAuthenticated} = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await checkSession();
        if (user) setUser(user);
        else clearIsAuthenticated();
      } catch (e) {
        clearIsAuthenticated();
      }
    };
    init();
  }, [setUser, clearIsAuthenticated]);


  return <>{children}</>;
}