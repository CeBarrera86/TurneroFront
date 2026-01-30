import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { TicketApiItem, TicketDetalle } from '@/domain/models/ticket';

const baseUrl = `${config.urlBase}${config.apiPrefix}/ticket`;

export const llamarTicket = async (id: Id, token: string): Promise<TicketDetalle> => {
  return request<TicketDetalle>(`${baseUrl}/${id}/llamar`, { method: 'POST', token });
};

export const getTicketsDisponibles = async (token: string): Promise<TicketApiItem[]> => {
  return request<TicketApiItem[]>(`${baseUrl}/disponibles`, { token, ...defaultRetryOptions });
};

export const getTicketsFiltrados = async (
  sectorId: Id,
  token: string
): Promise<TicketApiItem[]> => {
  const hoy = new Date().toISOString().split('T')[0];
  return request<TicketApiItem[]>(
    `${baseUrl}/filtrados?fecha=${hoy}&sectorIdOrigen=${sectorId}&estadoId=4`,
    { token, ...defaultRetryOptions }
  );
};

export const eliminarTicket = async (id: Id, token: string): Promise<void> => {
  const payload = { estadoId: 5 };
  await request<void>(`${baseUrl}/${id}`, {
    method: 'PATCH',
    token,
    body: payload,
    responseType: 'void',
  });
};

export const getTicketDetalle = async (id: Id, token: string): Promise<TicketDetalle> => {
  return request<TicketDetalle>(`${baseUrl}/${id}`, { token, ...defaultRetryOptions });
};

export const finalizarAtencion = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${baseUrl}/${id}/finalizar`, { method: 'POST', token, responseType: 'void' });
};

export const derivarTicket = async (
  id: Id,
  sectorId: Id,
  token: string,
  usuarioId: Id | null = null
): Promise<void> => {
  const payload: { sectorId: Id; usuarioId?: Id } = { sectorId };
  if (usuarioId) {
    payload.usuarioId = usuarioId;
  }
  await request<void>(`${baseUrl}/${id}/derivar`, {
    method: 'POST',
    token,
    body: payload,
    responseType: 'void',
  });
};

export const rellamarTicket = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${baseUrl}/${id}/rellamar`, { method: 'POST', token, responseType: 'void' });
};
