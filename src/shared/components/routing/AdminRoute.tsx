import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeJwtPayload } from '@/shared/utils/jwtUtils';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = sessionStorage.getItem('token');
  let isAdmin = false;
  if (token) {
    const payload = decodeJwtPayload(token);
    const permisos = payload?.permisoId || payload?.permisos || [];
    isAdmin = Array.isArray(permisos) && permisos.includes(1);
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;
