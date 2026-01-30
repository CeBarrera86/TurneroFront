import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';
import type { Contenido } from '@/domain/models/contenido';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Contenido`;

const withAuth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getContenidos = async (token: string): Promise<Contenido[]> => {
  const res = await fetch(`${BASE_URL}`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(`Error al obtener contenidos sincronizados: ${res.status}`);
  return res.json();
};

export const getContenidoPorId = async (id: Id, token: string): Promise<Contenido> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(`Error al obtener contenido: ${res.status}`);
  return res.json();
};

export const createContenido = async (formData: FormData, token: string): Promise<Contenido> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: withAuth(token),
    body: formData,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const updateContenido = async (
  id: Id,
  payload: Contenido,
  token: string
): Promise<Contenido> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...withAuth(token),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const deleteContenido = async (id: Id, token: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: withAuth(token),
  });
  if (!res.ok) throw new Error(`Error al eliminar contenido: ${res.status}`);
};
