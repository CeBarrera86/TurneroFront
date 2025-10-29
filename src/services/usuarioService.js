import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Usuario`;

export const getUsuarios = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
};

export const getUsuarioPorId = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener usuario');
  return await res.json();
};

export const createUsuario = async (payload, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear usuario');
  }
  return await res.json();
};

export const updateUsuario = async (id, payload, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al actualizar usuario');
  }
  return await res.json();
};

export const deleteUsuario = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
};

export const getRoles = async (token) => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Rol`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener roles');
  return await res.json();
};
