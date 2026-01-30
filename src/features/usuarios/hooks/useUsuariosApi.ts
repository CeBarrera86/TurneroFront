import {
  createUsuario,
  deleteUsuario,
  getRoles,
  getUsuarioPorId,
  getUsuarios,
  updateUsuario,
} from '@/data/services/usuarioService';

export const useUsuariosApi = () => ({
  getUsuarios,
  getUsuarioPorId,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getRoles,
});
