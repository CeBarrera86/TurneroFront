import { config } from '../config/config';

export const createRol = async (payload, token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Rol`, {
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

export const getRoles = async (token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Rol`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const deleteRol = async (id, token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Rol/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }

  if (!res.ok) throw new Error(`Error al eliminar rol: ${res.status}`);
};
