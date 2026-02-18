import { HttpError, request } from '@/data/http/httpClient';
import { config } from '@/shared/config/config';
import type { AuthPayload } from '@/shared/auth/AuthContext';

export { HttpError };

export const loginRequest = (usuario: string, password: string) =>
  request<AuthPayload>(
    'http://172.16.14.87:3011/api/login',
    {
      method: 'POST',
      body: { usuario, password },
      retries: 2,
      retryDelayMs: 400,
      retryOn: (error) => {
        if (error instanceof HttpError) {
          return error.status >= 500 || error.status === 429;
        }
        return error instanceof TypeError;
      },
    }
  );
