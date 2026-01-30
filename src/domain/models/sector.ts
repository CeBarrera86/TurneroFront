import type { Id } from './common';

export interface Sector {
  id?: Id;
  letra?: string;
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
  padreId?: Id | null;
  padre?: { nombre?: string };
}
