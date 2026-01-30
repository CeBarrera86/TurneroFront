import { createEstado, deleteEstado, getEstadoPorId, getEstados, updateEstado } from '@/data/services/estadoService';

export const useEstadosApi = () => ({
  getEstados,
  getEstadoPorId,
  createEstado,
  updateEstado,
  deleteEstado,
});
