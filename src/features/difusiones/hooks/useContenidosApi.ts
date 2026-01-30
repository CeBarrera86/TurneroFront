import { createContenido, deleteContenido, getContenidos, updateContenido } from '@/data/services/contenidoService';

export const useContenidosApi = () => ({
  getContenidos,
  createContenido,
  updateContenido,
  deleteContenido,
});
