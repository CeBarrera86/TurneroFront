import { createEstado, deleteEstado, getEstadoPorLetra, getEstados, updateEstado } from '@/data/services/estadoService';

export const useEstadosApi = () => ({
  getEstados,
  getEstadoPorLetra,
  createEstado,
  updateEstado,
  deleteEstado,
});
