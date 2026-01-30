import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablaCargaArchivo from '../tablas/TablaCargaArchivo';
import type { ArchivoAdjunto, CampoConfig } from '@/domain/models/forms';

interface CrearFormProps {
  campos: CampoConfig[];
  onSubmit: (payload: FormData | Record<string, unknown>, token: string | null) => Promise<unknown>;
  onSuccess?: (data: unknown) => void;
  volverA?: string | number;
}

const CrearForm = ({ campos, onSubmit, onSuccess, volverA }: CrearFormProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const inicial: Record<string, unknown> = {};
    campos.forEach(({ nombre, tipo, default: def }) => {
      inicial[nombre] = tipo === 'checkbox' ? def ?? false : tipo === 'file-multiple' ? [] : '';
    });
    return inicial;
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nombreCampo: string,
    tipo: string
  ) => {
    const target = e.target as HTMLInputElement;
    const valor = tipo === 'checkbox' ? target.checked : e.target.value;
    setFormData({ ...formData, [nombreCampo]: valor });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    try {
      const usesFiles = campos.some((campo) => campo.tipo === 'file-multiple');
      let payload: FormData | Record<string, unknown>;

      if (usesFiles) {
        const formDataFinal = new FormData();
        for (const campo of campos) {
          const { nombre, tipo } = campo;
          const valor = formData[nombre];

          if (tipo === 'file-multiple') {
            (valor as ArchivoAdjunto[]).forEach(({ file, activa }) => {
              formDataFinal.append('archivos', file);
              formDataFinal.append('activos[]', String(activa));
            });
          } else {
            formDataFinal.append(nombre, (valor ?? '') as string);
          }
        }
        payload = formDataFinal;
      } else {
        payload = { ...formData };
      }

      const data = await onSubmit(payload, token);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
    }
  };

  const handleCancel = () => {
    if (typeof volverA === 'number') {
      navigate(volverA);
      return;
    }
    if (typeof volverA === 'string') {
      navigate(volverA);
      return;
    }
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} alignItems="center">
        {campos.map(({ nombre, label, tipo, opciones, requerido, maxSizeMB }) => (
          <Box key={nombre} sx={{ width: '100%', maxWidth: 600 }}>
            {tipo === 'text' && (
              <TextField
                fullWidth
                label={label}
                value={String(formData[nombre] ?? '')}
                onChange={(e) => handleChange(e, nombre, tipo)}
                required={requerido}
              />
            )}
            {tipo === 'number' && (
              <TextField
                fullWidth
                label={label}
                type="number"
                value={String(formData[nombre] ?? '')}
                onChange={(e) => handleChange(e, nombre, tipo)}
                required={requerido}
              />
            )}
            {tipo === 'checkbox' && (
              <FormControlLabel
                control={
                  <Checkbox checked={Boolean(formData[nombre])} onChange={(e) => handleChange(e, nombre, tipo)} />
                }
                label={label}
              />
            )}
            {tipo === 'select' && (
              <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={String(formData[nombre] ?? '')}
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, nombre, tipo)}
                  label={label}
                >
                  <MenuItem value="">-- Elija opción --</MenuItem>
                  {opciones?.map((op) => (
                    <MenuItem key={op.value} value={op.value}>
                      {op.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {tipo === 'file-multiple' && (
              <TablaCargaArchivo
                label={label}
                nombre={nombre}
                maxSizeMB={maxSizeMB}
                onChange={(archivos) => setFormData({ ...formData, [nombre]: archivos })}
              />
            )}
          </Box>
        ))}
        <Box sx={{ width: '100%', maxWidth: 600, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default CrearForm;
