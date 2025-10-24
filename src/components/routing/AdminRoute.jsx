import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const rol = sessionStorage.getItem('rol');
  if (rol !== 'Admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;