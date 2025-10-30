import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '../../components/formularios/CrearForm';
import { createContenido } from '../../services/contenidoService';

const CrearContenido = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => { setTitulo('Agregar Contenido'); }, [setTitulo]);

  const campos = [
    {
      nombre: 'archivos',
      tipo: 'file-multiple',
      maxSizeMB: 20
    }
  ];

  const handleSubmit = async (formData, token) => {
    try {
      const data = await createContenido(formData, token);
      return data;
    } catch (err) {
      console.error('Error al crear contenido:', err);
      throw err;
    }
  };

  const handleSuccess = () => { navigate('/difusiones'); };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        volverA="/difusiones"
      />
    </Box>
  );
};

export default CrearContenido;