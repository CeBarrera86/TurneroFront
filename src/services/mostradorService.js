import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Mostrador`;

export const getMostradores = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener mostradores');
  return await res.json();
};

export const getMostradorPorId = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener mostrador');
  return await res.json();
};

export const createMostrador = async (payload, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al crear mostrador');
  return await res.json();
};

export const updateMostrador = async (id, payload, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al actualizar mostrador');
  return await res.json();
};

export const deleteMostrador = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al eliminar mostrador');
};