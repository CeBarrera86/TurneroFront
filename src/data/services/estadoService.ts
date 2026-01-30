import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Estado } from '@/domain/models/estado';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Estado`;

export const getEstados = async (token: string): Promise<Estado[]> => {
  return request<Estado[]>(BASE_URL, { token, ...defaultRetryOptions });
};

export const getEstadoPorId = async (id: Id, token: string): Promise<Estado> => {
  return request<Estado>(`${BASE_URL}/${id}`, { token, ...defaultRetryOptions });
};

export const createEstado = async (payload: Estado, token: string): Promise<Estado> => {
  return request<Estado>(BASE_URL, {
    method: 'POST',
    token,
    body: payload,
  });
};

export const updateEstado = async (
  id: Id,
  payload: Estado,
  token: string
): Promise<Estado> => {
  return request<Estado>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
};

export const deleteEstado = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};
