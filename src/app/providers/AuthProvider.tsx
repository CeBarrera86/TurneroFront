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
    if (data.usuario) sessionStorage.setItem('usuario', data.usuario);
    if (data.nombre) sessionStorage.setItem('nombre', data.nombre);
    if (data.apellido) sessionStorage.setItem('apellido', data.apellido);
    if (data.zona) sessionStorage.setItem('zona', data.zona);
    if (data.sector) sessionStorage.setItem('sector', data.sector);
    if (data.zonaId) sessionStorage.setItem('zonaId', String(data.zonaId));
    if (data.sectorId) sessionStorage.setItem('sectorId', String(data.sectorId));
    if (data.permisos) sessionStorage.setItem('permisos', JSON.stringify(data.permisos));
    setIsAuthenticated(true);
  };

  const value = useMemo<AuthContextValue>(() => ({ isAuthenticated, login, logout }), [
    isAuthenticated,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
