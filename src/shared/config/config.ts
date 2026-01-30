export const config = {
  urlBase: import.meta.env.VITE_API_BASE_URL ?? '',
  apiPrefix: '/api',
};

export type AppConfig = typeof config;
