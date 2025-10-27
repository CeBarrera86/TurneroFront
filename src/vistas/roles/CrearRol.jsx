import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '../../components/formularios/CrearForm';
import { createRol } from '../../services/rolService';

const CrearRol = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => { setTitulo('Crear Rol'); }, [setTitulo]);

  const campos = [{ nombre: 'tipo', label: 'Tipo de Rol', tipo: 'text' }];

  const handleSuccess = () => { navigate('/roles'); };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createRol(payload, token)}
        onSuccess={handleSuccess}
        volverA="/roles"
      />
    </Box>
  );
};

export default CrearRol;