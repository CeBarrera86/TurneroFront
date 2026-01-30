import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { Estado } from '@/domain/models/estado';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Estado`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getEstados = async (token: string): Promise<Estado[]> => {
  const res = await fetch(BASE_URL, { headers: withAuth(token) });
  if (!res.ok) throw new Error('Error al obtener estados');
  return await res.json();
};

export const getEstadoPorId = async (id: Id, token: string): Promise<Estado> => {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: withAuth(token) });
  if (!res.ok) throw new Error('Error al obtener estado');
  return await res.json();
};

export const createEstado = async (payload: Estado, token: string): Promise<Estado> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...withAuth(token) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al crear estado');
  return await res.json();
};

export const updateEstado = async (
  id: Id,
  payload: Estado,
  token: string
): Promise<Estado> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...withAuth(token) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al actualizar estado');
  return await res.json();
};

export const deleteEstado = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al eliminar estado');
};
