import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Mostrador } from '@/domain/models/mostrador';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Mostrador`;

export const getMostradores = async (token: string): Promise<Mostrador[]> => {
  return request<Mostrador[]>(BASE_URL, { token, ...defaultRetryOptions });
};

export const getMostradorPorId = async (id: Id, token: string): Promise<Mostrador> => {
  return request<Mostrador>(`${BASE_URL}/${id}`, { token, ...defaultRetryOptions });
};

export const createMostrador = async (
  payload: Mostrador,
  token: string
): Promise<Mostrador> => {
  return request<Mostrador>(BASE_URL, {
    method: 'POST',
    token,
    body: payload,
  });
};

export const updateMostrador = async (
  id: Id,
  payload: Mostrador,
  token: string
): Promise<Mostrador> => {
  return request<Mostrador>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
};

export const deleteMostrador = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};
