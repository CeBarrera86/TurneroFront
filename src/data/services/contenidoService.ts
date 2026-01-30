import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Contenido } from '@/domain/models/contenido';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Contenido`;

export const getContenidos = async (token: string): Promise<Contenido[]> => {
  return request<Contenido[]>(BASE_URL, { token, ...defaultRetryOptions });
};

export const getContenidoPorId = async (id: Id, token: string): Promise<Contenido> => {
  return request<Contenido>(`${BASE_URL}/${id}`, { token, ...defaultRetryOptions });
};

export const createContenido = async (formData: FormData, token: string): Promise<Contenido> => {
  return request<Contenido>(BASE_URL, {
    method: 'POST',
    token,
    body: formData,
  });
};

export const updateContenido = async (
  id: Id,
  payload: Contenido,
  token: string
): Promise<Contenido> => {
  return request<Contenido>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
};

export const deleteContenido = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};
