import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '@/shared/components/formularios/CrearForm';
import { createEstado } from '@/features/estados/controllers/estadosController';
import type { CampoConfig } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearEstado = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Crear Estado');
  }, [setTitulo]);

  const campos: CampoConfig[] = [
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: true },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true },
  ];

  const handleSuccess = () => {
    navigate('/estados');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createEstado(payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/estados"
      />
    </Box>
  );
};

export default CrearEstado;
