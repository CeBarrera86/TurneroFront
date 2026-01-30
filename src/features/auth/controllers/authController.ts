import { HttpError, request } from '@/data/http/httpClient';
import { config } from '@/shared/config/config';
import type { AuthPayload } from '@/shared/auth/AuthContext';

export { HttpError };

export const loginRequest = (username: string, password: string) =>
  request<AuthPayload>(`${config.urlBase}${config.apiPrefix}/token/login`, {
    method: 'POST',
    body: { username, password },
    retries: 2,
    retryDelayMs: 400,
    retryOn: (error) => {
      if (error instanceof HttpError) {
        return error.status >= 500 || error.status === 429;
      }
      return error instanceof TypeError;
    },
  });
