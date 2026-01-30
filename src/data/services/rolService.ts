import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { Rol } from '@/domain/models/usuario';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Rol`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getRoles = async (token: string): Promise<Rol[]> => {
  const res = await fetch(BASE_URL, { headers: withAuth(token) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getRolPorId = async (id: Id, token: string): Promise<Rol> => {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: withAuth(token) });
  if (!res.ok) throw new Error(`Error al obtener rol: ${res.status}`);
  return res.json();
};

export const createRol = async (payload: Rol, token: string): Promise<Rol> => {
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

export const updateRol = async (id: Id, payload: Rol, token: string): Promise<Rol> => {
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

export const deleteRol = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: withAuth(token),
  });
  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }
  if (!res.ok) throw new Error(`Error al eliminar rol: ${res.status}`);
};
