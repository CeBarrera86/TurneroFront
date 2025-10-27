const { VITE_DIR, VITE_PORT } = import.meta.env;

if (!VITE_DIR || !VITE_PORT) {
  console.warn("⚠️ Variables de entorno faltantes: VITE_DIR y/o VITE_PORT");
}

export const config = {
  urlBase: `${VITE_DIR}:${VITE_PORT}`,
  apiPrefix: '/api',
};