import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablaCargaArchivo from '../tablas/TablaCargaArchivo';

const CrearForm = ({ campos, onSubmit, onSuccess, volverA }) => {
  const [formData, setFormData] = useState(() => {
    const inicial = {};
    campos.forEach(({ nombre, tipo, default: def }) => {
      inicial[nombre] = tipo === 'checkbox' ? def ?? false : tipo === 'file-multiple' ? [] : '';
    });
    return inicial;
  });

  const navigate = useNavigate();

  const handleChange = (e, nombreCampo, tipo) => {
    const valor = tipo === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [nombreCampo]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    const formDataFinal = new FormData();
    for (const campo of campos) {
      const { nombre, tipo } = campo;
      const valor = formData[nombre];

      if (tipo === 'file-multiple') {
        valor.forEach(({ file, activa }) => {
          formDataFinal.append('archivos', file);
          formDataFinal.append('activos[]', activa);
        });
      } else {
        formDataFinal.append(nombre, valor ?? '');
      }
    }

    try {
      console.log('Contenido del FormData:');
      for (let [key, value] of formDataFinal.entries()) {
        console.log(`${key}:`, value);
      }
      const data = await onSubmit(formDataFinal, token);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
    }
  };

  const handleCancel = () => { navigate(volverA || -1); };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        {campos.map(({ nombre, label, tipo, opciones, requerido, maxSizeMB }) => (
          <Grid size={{ xs: 8 }} key={nombre}>
            {tipo === 'text' && (
              <TextField
                fullWidth
                label={label}
                value={formData[nombre]}
                onChange={(e) => handleChange(e, nombre, tipo)}
                required={requerido}
              />
            )}
            {tipo === 'number' && (
              <TextField
                fullWidth
                label={label}
                type="number"
                value={formData[nombre]}
                onChange={(e) => handleChange(e, nombre, tipo)}
                required={requerido}
              />
            )}
            {tipo === 'checkbox' && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[nombre]}
                    onChange={(e) => handleChange(e, nombre, tipo)}
                  />
                }
                label={label}
              />
            )}
            {tipo === 'select' && (
              <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={formData[nombre]}
                  onChange={(e) => handleChange(e, nombre, tipo)}
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
          </Grid>
        ))}
        <Grid size={{ xs: 8 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CrearForm;