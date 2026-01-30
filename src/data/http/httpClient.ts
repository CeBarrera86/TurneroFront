export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ResponseType = 'json' | 'text' | 'void';

import { config } from '@/shared/config/config';

export type RetryDecider = (error: unknown) => boolean;

export interface RequestOptions {
  method?: HttpMethod;
  token?: string;
  headers?: Headers | Record<string, string>;
  body?: unknown;
  timeoutMs?: number;
  responseType?: ResponseType;
  retries?: number;
  retryDelayMs?: number;
  retryOn?: RetryDecider;
}

const DEFAULT_TIMEOUT_MS = config.apiTimeoutMs;
const DEFAULT_RETRY_DELAY_MS = 400;

export const defaultRetryOptions = {
  retries: 2,
  retryDelayMs: DEFAULT_RETRY_DELAY_MS,
} as const;

export class HttpError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(body || `HTTP ${status}`);
    this.status = status;
    this.body = body;
  }
}

export class NetworkError extends Error {
  kind: 'timeout' | 'network';

  constructor(kind: 'timeout' | 'network', message: string) {
    super(message);
    this.kind = kind;
  }
}

const isFormData = (value: unknown): value is FormData =>
  typeof FormData !== 'undefined' && value instanceof FormData;

const isJsonBody = (value: unknown): boolean =>
  typeof value === 'object' &&
  value !== null &&
  !isFormData(value) &&
  !(value instanceof Blob) &&
  !(value instanceof ArrayBuffer) &&
  !(value instanceof URLSearchParams);

const buildHeaders = (token?: string, headers?: Headers | Record<string, string>, body?: unknown): Headers => {
  const result = new Headers(headers);
  if (token) {
    result.set('Authorization', `Bearer ${token}`);
  }
  if (isJsonBody(body) && !result.has('Content-Type')) {
    result.set('Content-Type', 'application/json');
  }
  return result;
};

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const isAbortError = (error: unknown): boolean =>
  error instanceof Error && error.name === 'AbortError';

const defaultRetryOn: RetryDecider = (error) => {
  if (isAbortError(error)) return false;
  if (error instanceof NetworkError) {
    return error.kind === 'network';
  }
  if (error instanceof HttpError) {
    return error.status >= 500 || error.status === 429;
  }
  return error instanceof TypeError;
};

export const getFriendlyErrorMessage = (error: unknown) => {
  if (error instanceof NetworkError) return error.message;
  if (error instanceof HttpError) {
    if (error.status === 401) return 'Credenciales inválidas.';
    if (error.status === 403) return 'Sin permisos para realizar la acción.';
    if (error.status >= 500) return 'Error del servidor. Intente más tarde.';
    return error.body || `Error HTTP ${error.status}`;
  }
  if (isAbortError(error)) return 'Tiempo de espera agotado.';
  return error instanceof Error ? error.message : 'Error inesperado.';
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const {
    method = 'GET',
    token,
    headers,
    body,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    responseType = 'json',
    retries = 0,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    retryOn = defaultRetryOn,
  } = options;

  const finalHeaders = buildHeaders(token, headers, body);
  const payload = isJsonBody(body) ? JSON.stringify(body) : body;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        method,
        headers: finalHeaders,
        body: payload as any,
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new HttpError(res.status, errorBody);
      }

      if (responseType === 'void' || res.status === 204) {
        return undefined as T;
      }

      if (responseType === 'text') {
        return (await res.text()) as T;
      }

      return (await res.json()) as T;
    } catch (error) {
      let mappedError: unknown = error;
      if (isAbortError(error)) {
        mappedError = new NetworkError('timeout', 'Tiempo de espera agotado.');
      } else if (error instanceof TypeError) {
        mappedError = new NetworkError('network', 'No se pudo conectar con el servidor.');
      }

      lastError = mappedError;
      const shouldRetry = attempt < retries && retryOn(mappedError);
      if (!shouldRetry) {
        throw mappedError;
      }
      const delay = retryDelayMs * Math.pow(2, attempt);
      await sleep(delay);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw lastError;
};
