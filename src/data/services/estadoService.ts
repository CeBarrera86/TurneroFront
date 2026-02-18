import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Estado } from '@/domain/models/estado';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/turnero/estados`;
const BASE_URL_SINGULAR = `${config.urlBase}${config.apiPrefix}/turnero/estado`;

type PagedResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};

export const getEstados = async (token: string): Promise<Estado[]> => {
  const response = await request<Estado[] | PagedResponse<Estado>>(BASE_URL, {
    token,
    ...defaultRetryOptions,
  });
  return Array.isArray(response) ? response : response.data;
};

export const getEstadoPorLetra = async (letra: Id, token: string): Promise<Estado> => {
  return request<Estado>(`${BASE_URL_SINGULAR}/${letra}`, { token, ...defaultRetryOptions });
};

export const createEstado = async (payload: Estado, token: string): Promise<Estado> => {
  return request<Estado>(BASE_URL_SINGULAR, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateEstado = async (
  id: Id,
  payload: Estado,
  token: string
): Promise<Estado> => {
  return request<Estado>(`${BASE_URL_SINGULAR}/${id}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteEstado = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL_SINGULAR}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};
