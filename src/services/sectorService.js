import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Sector`;

export const getSectores = async (token) => {
  const res = await fetch(BASE_URL, { headers: { Authorization: `Bearer ${token}` }, });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getSectoresActivosPadres = async (token) => {
  const res = await fetch(`${BASE_URL}/activos-padres`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Error al obtener sectores activos padres');
  return await res.json();
};

export const getSectorPorId = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` }, });
  if (!res.ok) throw new Error(`Error al obtener sector: ${res.status}`);
  return res.json();
};

export const createSector = async (payload, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const updateSector = async (id, payload, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const deleteSector = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }
  if (!res.ok) throw new Error(`Error al eliminar sector: ${res.status}`);
};