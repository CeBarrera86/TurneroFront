import { config } from '../config/config';

export const createSector = async (payload, token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Sector`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
};

export const getSectores = async (token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Sector`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const deleteSector = async (id, token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Sector/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }

  if (!res.ok) throw new Error(`Error al eliminar sector: ${res.status}`);
};