import type { Id } from './common';

export interface Usuario {
  id?: Id;
  nombre?: string;
  apellido?: string;
  username?: string;
  rolTipo?: string;
  rolId?: Id;
  sectorId?: Id;
  mostradorId?: Id;
}

export interface Rol {
  id?: Id;
  nombre?: string;
  tipo?: string;
}
