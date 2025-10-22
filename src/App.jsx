import { ThemeProvider, CssBaseline } from '@mui/material';
import corpicoTheme from './theme/Themes';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Turnero from './vistas/Turnero.jsx';
import Login from './vistas/Login.jsx';
import ComponentePrincipal from './components/layouts/ComponentePrincipal.jsx';
import { useAuth } from './context/AuthContext';

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
        <ComponentePrincipal>
          <Turnero />
        </ComponentePrincipal>
      </ProtectedRoute>
    ),
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