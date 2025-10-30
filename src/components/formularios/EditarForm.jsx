import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditarForm = ({ campos, id, onSubmit, getPorId, onSuccess, volverA }) => {
  const [formData, setFormData] = useState(() => {
    const inicial = {};
    campos.forEach(({ nombre, tipo, default: def }) => { inicial[nombre] = tipo === 'checkbox' ? def ?? false : ''; });
    return inicial;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getPorId(id, token)
      .then((data) => {
        const actualizado = {};
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
    ['letra', 'nombre', 'descripcion'].forEach((campo) => { if (payload[campo] === '') payload[campo] = null; });

    try {
      const data = await onSubmit(id, payload, token);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al actualizar:', err);
    }
  };

  const handleCancel = () => { navigate(volverA || -1); };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
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
                control={<Checkbox checked={formData[nombre]} onChange={(e) => handleChange(e, nombre, tipo)} />}
                label={label}
              />
            )}
            {tipo === 'select' && (
              <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select value={formData[nombre]} onChange={(e) => handleChange(e, nombre, tipo)} label={label} >
                  <MenuItem value="">-- Seleccione Opción --</MenuItem>
                  {opciones?.map((op) => (<MenuItem key={op.value} value={op.value}> {op.label} </MenuItem>))}
                </Select>
              </FormControl>
            )}
          </Grid>
        ))}
        <Grid size={{ xs: 8 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
          <Button variant="contained" type="submit">Guardar</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditarForm;