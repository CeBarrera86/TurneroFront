import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Rol } from '@/domain/models/usuario';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Rol`;

export const getRoles = async (token: string): Promise<Rol[]> => {
  type PagedResponse<T> = {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
  };

  const response = await request<Rol[] | PagedResponse<Rol>>(BASE_URL, {
    token,
    ...defaultRetryOptions,
  });

  const roles = Array.isArray(response) ? response : response.data;
  return roles.map((rol) => ({
    ...rol,
    tipo: rol.tipo ?? rol.nombre,
    nombre: rol.nombre ?? rol.tipo,
  }));
};

export const getRolPorId = async (id: Id, token: string): Promise<Rol> => {
  return request<Rol>(`${BASE_URL}/${id}`, { token, ...defaultRetryOptions });
};

export const createRol = async (payload: Rol, token: string): Promise<Rol> => {
  return request<Rol>(BASE_URL, {
    method: 'POST',
    token,
    body: payload,
  });
};

export const updateRol = async (id: Id, payload: Rol, token: string): Promise<Rol> => {
  return request<Rol>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
};

export const deleteRol = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};
