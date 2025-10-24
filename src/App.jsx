import { ThemeProvider, CssBaseline } from '@mui/material';
import corpicoTheme from './theme/Themes';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AdminRoute from './components/routing/AdminRoute.jsx';
import Home from './vistas/Home.jsx';
import Roles from './vistas/roles/Roles.jsx';
import CrearRol from './vistas/roles/CrearRol.jsx';
import EditarRol from './vistas/roles/EditarRol.jsx';
import Login from './vistas/Login.jsx';
import ComponentePrincipal from './components/layouts/ComponentePrincipal.jsx';
import { useAuth } from './context/AuthContext';

// 🔐 Protección de rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ComponentePrincipal />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Home /> },
      {
        path: 'roles',
        element: (
          <AdminRoute>
            <Roles />
          </AdminRoute>
        ),
      },
      {
        path: 'roles/crear',
        element: (
          <AdminRoute>
            <CrearRol />
          </AdminRoute>
        ),
      },
      {
        path: 'roles/editar/:id',
        element: (
          <AdminRoute>
            <EditarRol />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={corpicoTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;