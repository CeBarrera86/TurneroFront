const normalizeBase = (value: string) => value.replace(/\/$/, '');

const buildApiBaseUrl = () => {
  const full = import.meta.env.VITE_API_BASE_URL;
  if (full) return normalizeBase(full);

  const dir = import.meta.env.VITE_DIR ?? '';
  const port = import.meta.env.VITE_PORT ?? '';
  if (dir && port) return `${normalizeBase(dir)}:${port}`;
  if (dir) return normalizeBase(dir);
  return '';
};

const parseTimeout = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const config = {
  urlBase: buildApiBaseUrl(),
  apiPrefix: import.meta.env.VITE_API_PREFIX ?? '/api',
  apiTimeoutMs: parseTimeout(import.meta.env.VITE_API_TIMEOUT_MS, 15000),
};

export const resolveApiUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${config.urlBase}${config.apiPrefix}${normalized}`;
};

export type AppConfig = typeof config;
