import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Rol, Usuario } from '@/domain/models/usuario';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Usuario`;

export const getUsuarios = async (token: string): Promise<Usuario[]> => {
  type PagedResponse<T> = {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
  };

  const response = await request<Usuario[] | PagedResponse<Usuario>>(BASE_URL, {
    token,
    ...defaultRetryOptions,
  });

  const usuarios = Array.isArray(response) ? response : response.data;
  return usuarios.map((u) => ({
    ...u,
    rolTipo: u.rolTipo ?? u.rolNombre,
    rolNombre: u.rolNombre ?? u.rolTipo,
  }));
};

export const getUsuarioPorId = async (id: Id, token: string): Promise<Usuario> => {
  return request<Usuario>(`${BASE_URL}/${id}`, { token, ...defaultRetryOptions });
};

export const createUsuario = async (payload: Usuario, token: string): Promise<Usuario> => {
  return request<Usuario>(BASE_URL, {
    method: 'POST',
    token,
    body: payload,
  });
};

export const updateUsuario = async (
  id: Id,
  payload: Usuario,
  token: string
): Promise<Usuario> => {
  return request<Usuario>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
};

export const deleteUsuario = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};

export const getRoles = async (token: string): Promise<Rol[]> => {
  return request<Rol[]>(`${config.urlBase}${config.apiPrefix}/Rol`, { token, ...defaultRetryOptions });
};

export const getUsuariosPorSector = async (sectorId: Id, token: string): Promise<Usuario[]> => {
  return request<Usuario[]>(`${BASE_URL}/sector/${sectorId}`, { token, ...defaultRetryOptions });
};
