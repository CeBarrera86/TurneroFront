import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const rol = sessionStorage.getItem('rol');
  if (rol !== 'Admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;
