import type { Id } from './common';

export interface TicketCliente {
  titular?: string;
}

export interface TicketClienteNavigation {
  titular?: string;
}

export interface TicketApiItem {
  id: Id;
  letra: string;
  numero: number | string;
  clienteNavigation?: TicketClienteNavigation;
}

export interface TicketDetalle {
  id: Id;
  letra?: string;
  numero?: number | string;
  estadoId?: Id;
  sectorId?: Id;
  usuarioId?: Id;
  sector?: { nombre?: string };
  estado?: { descripcion?: string };
  cliente?: { titular?: string; dni?: string };
}
