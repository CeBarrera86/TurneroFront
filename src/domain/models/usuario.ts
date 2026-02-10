import type { Id } from './common';

export interface Usuario {
  id?: Id;
  nombre?: string;
  apellido?: string;
  username?: string;
  activo?: boolean;
  rolNombre?: string;
  rolTipo?: string;
  rolId?: Id;
  sectorId?: Id;
  mostradorId?: Id;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rol {
  id?: Id;
  nombre?: string;
  tipo?: string;
  createdAt?: string;
  updatedAt?: string;
}
