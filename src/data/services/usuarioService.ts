import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { Rol, Usuario } from '@/domain/models/usuario';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Usuario`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getUsuarios = async (token: string): Promise<Usuario[]> => {
  const res = await fetch(BASE_URL, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
};

export const getUsuarioPorId = async (id: Id, token: string): Promise<Usuario> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al obtener usuario');
  return await res.json();
};

export const createUsuario = async (payload: Usuario, token: string): Promise<Usuario> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...withAuth(token),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear usuario');
  }
  return await res.json();
};

export const updateUsuario = async (
  id: Id,
  payload: Usuario,
  token: string
): Promise<Usuario> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...withAuth(token),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al actualizar usuario');
  }
  return await res.json();
};

export const deleteUsuario = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
};

export const getRoles = async (token: string): Promise<Rol[]> => {
  const res = await fetch(`${config.urlBase}${config.apiPrefix}/Rol`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al obtener roles');
  return await res.json();
};

export const getUsuariosPorSector = async (sectorId: Id, token: string): Promise<Usuario[]> => {
  const res = await fetch(`${BASE_URL}/sector/${sectorId}`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error('Error al obtener usuarios del sector');
  return await res.json();
};
