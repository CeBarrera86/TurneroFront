import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '../../components/formularios/CrearForm';
import { createEstado } from '../../services/estadoService';

const CrearEstado = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => { setTitulo('Crear Estado'); }, [setTitulo]);

  const campos = [
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: true },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true }
  ];

  const handleSuccess = () => { navigate('/estados'); };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createEstado(payload, token)}
        onSuccess={handleSuccess}
        volverA="/estados"
      />
    </Box>
  );
};

export default CrearEstado;