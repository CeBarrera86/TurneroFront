import { config } from '@/shared/config/config';
import { request } from '@/data/http/httpClient';
import type { Id } from '@/domain/models/common';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Turno`;

export interface TurnoCrearDto {
  ticketId: Id;
}

export const createTurno = async (payload: TurnoCrearDto, token: string) => {
  return request<unknown>(BASE_URL, {
    method: 'POST',
    token,
    body: payload,
  });
};
