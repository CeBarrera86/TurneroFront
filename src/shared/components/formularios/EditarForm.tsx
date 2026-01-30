import React, { useState, useEffect } from 'react';
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
import type { CampoConfig } from '@/domain/models/forms';
import type { Id } from '@/domain/models/common';

interface EditarFormProps {
  campos: CampoConfig[];
  id: Id;
  onSubmit: (id: Id, payload: Record<string, unknown>, token: string) => Promise<unknown>;
  getPorId: (id: Id, token: string) => Promise<Record<string, unknown> | any>;
  onSuccess?: (data: unknown) => void;
  volverA?: string | number;
}

const EditarForm = ({ campos, id, onSubmit, getPorId, onSuccess, volverA }: EditarFormProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const inicial: Record<string, unknown> = {};
    campos.forEach(({ nombre, tipo, default: def }) => {
      inicial[nombre] = tipo === 'checkbox' ? def ?? false : '';
    });
    return inicial;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token') ?? '';
    getPorId(id, token)
      .then((data) => {
        const actualizado: Record<string, unknown> = {};
        campos.forEach(({ nombre, tipo }) => {
          if (tipo === 'checkbox') {
            actualizado[nombre] = data[nombre] === true || data[nombre] === 'true';
          } else {
            actualizado[nombre] = data[nombre] ?? '';
          }
        });
        setFormData(actualizado);
      })
      .catch((err) => console.error('Error al cargar datos:', err));
  }, [getPorId, id, campos]);

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
    const token = sessionStorage.getItem('token') ?? '';
    const payload: Record<string, unknown> = { ...formData };

    if (payload.padreId === '') payload.padreId = null;
    if (typeof payload.activo === 'string') payload.activo = payload.activo === 'true';
    ['letra', 'nombre', 'descripcion'].forEach((campo) => {
      if (payload[campo] === '') payload[campo] = null;
    });

    try {
      const data = await onSubmit(id, payload, token);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al actualizar:', err);
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
        {campos.map(({ nombre, label, tipo, opciones, requerido }) => (
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
                control={<Checkbox checked={Boolean(formData[nombre])} onChange={(e) => handleChange(e, nombre, tipo)} />}
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
                  <MenuItem value="">-- Seleccione Opción --</MenuItem>
                  {opciones?.map((op) => (
                    <MenuItem key={op.value} value={op.value}>
                      {op.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default EditarForm;
