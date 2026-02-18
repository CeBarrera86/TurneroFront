// Devuelve zonaId del token JWT actual
export function getZonaId(): number {
  const token = sessionStorage.getItem('token');
  if (!token) return 0;
  const payload = decodeJwtPayload(token);
  return payload?.zonaId || 0;
}

// Devuelve sectorId del token JWT actual
export function getSectorId(): number {
  const token = sessionStorage.getItem('token');
  if (!token) return 0;
  const payload = decodeJwtPayload(token);
  return payload?.sectorId || 0;
}

// Devuelve permisoId (array) del token JWT actual
export function getPermisoId(): number[] {
  const token = sessionStorage.getItem('token');
  if (!token) return [];
  const payload = decodeJwtPayload(token);
  return payload?.permisoId || payload?.permisos || [];
}

// Utilidad para decodificar un JWT (sin validar firma)
export function decodeJwtPayload(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
