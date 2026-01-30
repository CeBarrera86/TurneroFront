import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '@/shared/components/formularios/CrearForm';
import { createRol } from '@/features/roles/controllers/rolesController';
import type { CampoConfig } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearRol = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Crear Rol');
  }, [setTitulo]);

  const campos: CampoConfig[] = [{ nombre: 'tipo', label: 'Tipo de Rol', tipo: 'text' }];

  const handleSuccess = () => {
    navigate('/roles');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createRol(payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/roles"
      />
    </Box>
  );
};

export default CrearRol;
