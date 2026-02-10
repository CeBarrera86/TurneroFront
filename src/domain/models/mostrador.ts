import type { Id } from './common';

export interface Mostrador {
  id?: Id;
  numero?: number;
  ip?: string;
  tipo?: string;
  sectorId?: Id;
  sectorNombre?: string;
  sectores?: Array<{ nombre?: string }>;
  createdAt?: string;
  updatedAt?: string;
}
