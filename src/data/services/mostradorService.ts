import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { Mostrador } from '@/domain/models/mostrador';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Mostrador`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getMostradores = async (token: string): Promise<Mostrador[]> => {
  const res = await fetch(BASE_URL, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al obtener mostradores');
  return await res.json();
};

export const getMostradorPorId = async (id: Id, token: string): Promise<Mostrador> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al obtener mostrador');
  return await res.json();
};

export const createMostrador = async (
  payload: Mostrador,
  token: string
): Promise<Mostrador> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...withAuth(token),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al crear mostrador');
  return await res.json();
};

export const updateMostrador = async (
  id: Id,
  payload: Mostrador,
  token: string
): Promise<Mostrador> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...withAuth(token),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al actualizar mostrador');
  return await res.json();
};

export const deleteMostrador = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al eliminar mostrador');
};
