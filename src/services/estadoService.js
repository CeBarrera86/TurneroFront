import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Estado`;

export const getEstados = async (token) => {
  const res = await fetch(BASE_URL, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Error al obtener estados');
  return await res.json();
};

export const getEstadoPorId = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Error al obtener estado');
  return await res.json();
};

export const createEstado = async (payload, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al crear estado');
  return await res.json();
};

export const updateEstado = async (id, payload, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al actualizar estado');
  return await res.json();
};

export const deleteEstado = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al eliminar estado');
};