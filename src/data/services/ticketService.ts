import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { TicketApiItem, TicketDetalle } from '@/domain/models/ticket';

const baseUrl = `${config.urlBase}${config.apiPrefix}/ticket`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const llamarTicket = async (id: Id, token: string): Promise<TicketDetalle> => {
  const res = await fetch(`${baseUrl}/${id}/llamar`, {
    method: 'POST',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getTicketsDisponibles = async (token: string): Promise<TicketApiItem[]> => {
  const res = await fetch(`${baseUrl}/disponibles`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getTicketsFiltrados = async (
  sectorId: Id,
  token: string
): Promise<TicketApiItem[]> => {
  const hoy = new Date().toISOString().split('T')[0];
  const res = await fetch(
    `${baseUrl}/filtrados?fecha=${hoy}&sectorIdOrigen=${sectorId}&estadoId=4`,
    {
      headers: withAuth(token),
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const eliminarTicket = async (id: Id, token: string): Promise<void> => {
  const payload = { estadoId: 5 };
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      ...withAuth(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const getTicketDetalle = async (id: Id, token: string): Promise<TicketDetalle> => {
  const res = await fetch(`${baseUrl}/${id}`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const finalizarAtencion = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/${id}/finalizar`, {
    method: 'POST',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(await res.text());
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

  const res = await fetch(`${baseUrl}/${id}/derivar`, {
    method: 'POST',
    headers: {
      ...withAuth(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
};

export const rellamarTicket = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/${id}/rellamar`, {
    method: 'POST',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(await res.text());
};
