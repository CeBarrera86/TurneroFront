import { createRol, deleteRol, getRolPorId, getRoles, updateRol } from '@/data/services/rolService';

export const useRolesApi = () => ({
  getRoles,
  getRolPorId,
  createRol,
  updateRol,
  deleteRol,
});
