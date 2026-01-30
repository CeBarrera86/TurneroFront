export type CampoTipo = 'text' | 'number' | 'checkbox' | 'select' | 'file-multiple';

export interface CampoOption {
  value: string | number;
  label: string;
}

export interface CampoConfig {
  nombre: string;
  label: string;
  tipo: CampoTipo;
  opciones?: CampoOption[];
  requerido?: boolean;
  default?: string | number | boolean | null;
  maxSizeMB?: number;
}

export interface ArchivoAdjunto {
  file: File;
  nombre: string;
  activa: boolean;
  sizeMB: number;
}
