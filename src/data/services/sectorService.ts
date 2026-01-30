import { config } from '@/shared/config/config';
import { defaultRetryOptions, request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';
import type { Sector } from '@/domain/models/sector';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Sector`;

export const getSectores = async (token: string): Promise<Sector[]> => {
  return request<Sector[]>(BASE_URL, { token, ...defaultRetryOptions });
};

export const getSectoresActivosPadres = async (token: string): Promise<Sector[]> => {
  return request<Sector[]>(`${BASE_URL}/activos-padres`, { token, ...defaultRetryOptions });
};

export const getSectorPorId = async (id: Id, token: string): Promise<Sector> => {
  return request<Sector>(`${BASE_URL}/${id}`, { token, ...defaultRetryOptions });
};

export const createSector = async (payload: Sector, token: string): Promise<Sector> => {
  return request<Sector>(BASE_URL, {
    method: 'POST',
    token,
    body: payload,
  });
};

export const updateSector = async (
  id: Id,
  payload: Sector,
  token: string
): Promise<Sector> => {
  return request<Sector>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
};

export const deleteSector = async (id: Id, token: string): Promise<void> => {
  await request<void>(`${BASE_URL}/${id}`, { method: 'DELETE', token, responseType: 'void' });
};
