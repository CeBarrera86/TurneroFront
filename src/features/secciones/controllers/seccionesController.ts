import {
  derivarTicket,
  eliminarTicket,
  finalizarAtencion,
  getTicketDetalle,
  getTicketsFiltrados,
  llamarTicket,
  rellamarTicket,
} from '@/data/services/ticketService';
import { createTurno } from '@/data/services/turnoService';
import { getSectores } from '@/data/services/sectorService';
import { getUsuariosPorSector } from '@/data/services/usuarioService';

export {
  llamarTicket,
  eliminarTicket,
  getTicketDetalle,
  getTicketsFiltrados,
  finalizarAtencion,
  derivarTicket,
  rellamarTicket,
  getSectores,
  getUsuariosPorSector,
  createTurno,
};
