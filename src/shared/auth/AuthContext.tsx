import { createContext } from 'react';

export interface AuthPayload {
  token: string;
  name: string;
  username: string;
  rol: string;
  mostradorTipo?: string;
  mostradorSector?: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  login: (data: AuthPayload) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
