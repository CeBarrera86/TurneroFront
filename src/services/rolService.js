import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Rol`;

export const getRoles = async (token) => {
  const res = await fetch(BASE_URL, { headers: { Authorization: `Bearer ${token}` }, });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getRolPorId = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` }, });
  if (!res.ok) throw new Error(`Error al obtener rol: ${res.status}`);
  return res.json();
};

export const createRol = async (payload, token) => {
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

export const updateRol = async (id, payload, token) => {
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

export const deleteRol = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }
  if (!res.ok) throw new Error(`Error al eliminar rol: ${res.status}`);
};
