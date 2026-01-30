import {
  createMostrador,
  deleteMostrador,
  getMostradorPorId,
  getMostradores,
  updateMostrador,
} from '@/data/services/mostradorService';
import { getSectoresActivosPadres } from '@/data/services/sectorService';

export const useMostradoresApi = () => ({
  getMostradores,
  getMostradorPorId,
  createMostrador,
  updateMostrador,
  deleteMostrador,
  getSectoresActivosPadres,
});
