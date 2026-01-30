import type { Id } from './common';

export interface Contenido {
  id?: Id;
  titulo?: string;
  descripcion?: string;
  url?: string;
  urlMiniatura?: string;
  tipo?: string;
  nombre?: string;
  activa?: boolean;
}
