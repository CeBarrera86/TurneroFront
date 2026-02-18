import { createContext } from 'react';

export interface AuthPayload {
  token: string;
  usuario?: string;
  nombre?: string;
  apellido?: string;
  zona?: string;
  sector?: string;
  zonaId?: number;
  sectorId?: number;
  permisos?: string[];
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  login: (data: AuthPayload) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
