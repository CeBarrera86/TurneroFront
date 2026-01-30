import {
  createSector,
  deleteSector,
  getSectorPorId,
  getSectores,
  updateSector,
  getSectoresActivosPadres,
} from '@/data/services/sectorService';

export const useSectoresApi = () => ({
  getSectores,
  getSectorPorId,
  createSector,
  updateSector,
  deleteSector,
  getSectoresActivosPadres,
});
