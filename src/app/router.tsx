import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/app/routing/ProtectedRoute';
import AdminRoute from '@/shared/components/routing/AdminRoute';
import ComponentePrincipal from '@/shared/layouts/ComponentePrincipal';

const Home = lazy(() => import('@/features/home/pages/Home'));
const Login = lazy(() => import('@/features/auth/pages/Login'));
const SeccionesCajas = lazy(() => import('@/features/secciones/pages/Cajas'));
const SeccionesUsuarios = lazy(() => import('@/features/secciones/pages/Usuarios'));
const SeccionesReclamos = lazy(() => import('@/features/secciones/pages/Reclamos'));
const Estados = lazy(() => import('@/features/estados/pages/Estados'));
const CrearEstado = lazy(() => import('@/features/estados/pages/CrearEstado'));
const EditarEstado = lazy(() => import('@/features/estados/pages/EditarEstado'));
const Mostradores = lazy(() => import('@/features/mostradores/pages/Mostradores'));
const CrearMostrador = lazy(() => import('@/features/mostradores/pages/CrearMostrador'));
const EditarMostrador = lazy(() => import('@/features/mostradores/pages/EditarMostrador'));
const Contenidos = lazy(() => import('@/features/difusiones/pages/Contenidos'));
const CrearContenido = lazy(() => import('@/features/difusiones/pages/CrearContenido'));
const Roles = lazy(() => import('@/features/roles/pages/Roles'));
const CrearRol = lazy(() => import('@/features/roles/pages/CrearRol'));
const EditarRol = lazy(() => import('@/features/roles/pages/EditarRol'));
const Sectores = lazy(() => import('@/features/sectores/pages/Sectores'));
const CrearSector = lazy(() => import('@/features/sectores/pages/CrearSector'));
const EditarSector = lazy(() => import('@/features/sectores/pages/EditarSector'));
const Usuarios = lazy(() => import('@/features/usuarios/pages/Usuarios'));
const CrearUsuario = lazy(() => import('@/features/usuarios/pages/CrearUsuario'));
const EditarUsuario = lazy(() => import('@/features/usuarios/pages/EditarUsuario'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ComponentePrincipal />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Home /> },
      { path: 'secciones/cajas', element: (<AdminRoute><SeccionesCajas /></AdminRoute>) },
      { path: 'secciones/usuarios', element: (<AdminRoute><SeccionesUsuarios /></AdminRoute>) },
      { path: 'secciones/reclamos', element: (<AdminRoute><SeccionesReclamos /></AdminRoute>) },
      { path: 'estados', element: (<AdminRoute><Estados /></AdminRoute>) },
      { path: 'estados/crear', element: (<AdminRoute><CrearEstado /></AdminRoute>) },
      { path: 'estados/editar/:id', element: (<AdminRoute><EditarEstado /></AdminRoute>) },
      { path: 'mostradores', element: (<AdminRoute><Mostradores /></AdminRoute>) },
      { path: 'mostradores/crear', element: (<AdminRoute><CrearMostrador /></AdminRoute>) },
      { path: 'mostradores/editar/:id', element: (<AdminRoute><EditarMostrador /></AdminRoute>) },
      { path: 'difusiones', element: (<AdminRoute><Contenidos /></AdminRoute>) },
      { path: 'difusiones/crear', element: (<AdminRoute><CrearContenido /></AdminRoute>) },
      { path: 'roles', element: (<AdminRoute><Roles /></AdminRoute>) },
      { path: 'roles/crear', element: (<AdminRoute><CrearRol /></AdminRoute>) },
      { path: 'roles/editar/:id', element: (<AdminRoute><EditarRol /></AdminRoute>) },
      { path: 'sectores', element: (<AdminRoute><Sectores /></AdminRoute>) },
      { path: 'sectores/crear', element: (<AdminRoute><CrearSector /></AdminRoute>) },
      { path: 'sectores/editar/:id', element: (<AdminRoute><EditarSector /></AdminRoute>) },
      { path: 'usuarios', element: (<AdminRoute><Usuarios /></AdminRoute>) },
      { path: 'usuarios/crear', element: (<AdminRoute><CrearUsuario /></AdminRoute>) },
      { path: 'usuarios/editar/:id', element: (<AdminRoute><EditarUsuario /></AdminRoute>) },
    ],
  },
  { path: '/login', element: <Login /> },
]);
