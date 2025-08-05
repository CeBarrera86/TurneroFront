import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './vistas/Login.jsx';
import Turnero from './vistas/Turnero.jsx';
import ComponentePrincipal from './components/layouts/ComponentePrincipal.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComponentePrincipal><Turnero /></ComponentePrincipal>,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;