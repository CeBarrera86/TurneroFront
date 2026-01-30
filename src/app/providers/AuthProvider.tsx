import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthPayload, type AuthContextValue } from '@/shared/auth/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = sessionStorage.getItem('token');
    return !!token;
  });

  const logout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Logout por inactividad
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeout: number | undefined;
    const resetTimer = () => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        logout();
        alert('Sesión cerrada por inactividad');
      }, 15 * 60 * 1000); // 15 minutos
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'] as const;
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (timeout) window.clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated]);

  const login = (data: AuthPayload) => {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('nombre', data.name);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('rol', data.rol);
    if (data.mostradorTipo) {
      sessionStorage.setItem('mostradorTipo', data.mostradorTipo);
    }
    if (data.mostradorSector) {
      sessionStorage.setItem('mostradorSector', data.mostradorSector);
    }
    setIsAuthenticated(true);
  };

  const value = useMemo<AuthContextValue>(() => ({ isAuthenticated, login, logout }), [
    isAuthenticated,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
