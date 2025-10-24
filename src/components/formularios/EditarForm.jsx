import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditarForm = ({ campos, endpoint, id, onSuccess, volverA }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch(`${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setFormData(data))
      .catch((err) => console.error('Error al cargar datos:', err));
  }, [endpoint, id]);

  const handleChange = (e, nombreCampo) => {
    setFormData({ ...formData, [nombreCampo]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al actualizar:', err);
    }
  };

  const handleCancel = () => {
    navigate(volverA || -1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {campos.map(({ nombre, label, tipo }) => (
          <Grid size={{ xs: 12 }} key={nombre}>
            <TextField
              fullWidth
              label={label}
              type={tipo}
              value={formData[nombre] || ''}
              onChange={(e) => handleChange(e, nombre)}
              required
            />
          </Grid>
        ))}
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
          <Button variant="contained" type="submit">Guardar</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditarForm;