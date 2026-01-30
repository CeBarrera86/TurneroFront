import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { Sector } from '@/domain/models/sector';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Sector`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getSectores = async (token: string): Promise<Sector[]> => {
  const res = await fetch(BASE_URL, { headers: withAuth(token) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getSectoresActivosPadres = async (token: string): Promise<Sector[]> => {
  const res = await fetch(`${BASE_URL}/activos-padres`, { headers: withAuth(token) });
  if (!res.ok) throw new Error('Error al obtener sectores activos padres');
  return await res.json();
};

export const getSectorPorId = async (id: Id, token: string): Promise<Sector> => {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: withAuth(token) });
  if (!res.ok) throw new Error(`Error al obtener sector: ${res.status}`);
  return res.json();
};

export const createSector = async (payload: Sector, token: string): Promise<Sector> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...withAuth(token) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const updateSector = async (
  id: Id,
  payload: Sector,
  token: string
): Promise<Sector> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...withAuth(token) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const deleteSector = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: withAuth(token),
  });
  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }
  if (!res.ok) throw new Error(`Error al eliminar sector: ${res.status}`);
};
