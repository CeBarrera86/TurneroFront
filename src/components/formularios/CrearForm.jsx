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

const CrearForm = ({ campos, onSubmit, onSuccess, volverA }) => {
  const [formData, setFormData] = useState(() => {
    const inicial = {};
    campos.forEach(({ nombre, tipo, default: def }) => {
      inicial[nombre] = tipo === 'checkbox' ? def ?? false : '';
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

    const payload = { ...formData };
    if (payload.padreId === '') payload.padreId = null;
    if (typeof payload.activo === 'string') payload.activo = payload.activo === 'true';
    ['letra', 'nombre', 'descripcion'].forEach((campo) => {
      if (payload[campo] === '') payload[campo] = null;
    });

    try {
      const data = await onSubmit(payload, token);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
    }
  };

  const handleCancel = () => {
    navigate(volverA || -1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {campos.map(({ nombre, label, tipo, opciones, requerido }) => (
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
                  <MenuItem value="">Sin padre</MenuItem>
                  {opciones?.map((op) => (
                    <MenuItem key={op.value} value={op.value}>
                      {op.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        ))}
        <Grid size={{ xs: 8 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
          <Button variant="contained" type="submit">Guardar</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CrearForm;