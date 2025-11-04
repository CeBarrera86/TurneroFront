import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = sessionStorage.getItem('token');
    return !!token;
  });

  // Logout por inactividad
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logout();
        alert('Sesión cerrada por inactividad');
      }, 15 * 60 * 1000); // 10 minutos
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated]);

  const login = (data) => {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('nombre', data.name);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('rol', data.rol);
    sessionStorage.setItem('mostradorTipo', data.mostradorTipo);
    sessionStorage.setItem('mostradorSector', data.mostradorSector);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};