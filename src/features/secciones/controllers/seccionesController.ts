import {
  derivarTicket,
  eliminarTicket,
  finalizarAtencion,
  getTicketDetalle,
  getTicketsFiltrados,
  llamarTicket,
  rellamarTicket,
} from '@/data/services/ticketService';
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
};
