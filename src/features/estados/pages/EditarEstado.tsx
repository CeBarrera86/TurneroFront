import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '@/shared/components/formularios/EditarForm';
import { getEstadoPorId, updateEstado } from '@/features/estados/controllers/estadosController';
import type { CampoConfig } from '@/domain/models/forms';
import type { Id } from '@/domain/models/common';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const EditarEstado = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTitulo('Editar Estado');
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
      <EditarForm
        campos={campos}
        id={(id ?? '') as Id}
        getPorId={getEstadoPorId}
        onSubmit={(estadoId, payload, token) => updateEstado(estadoId, payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/estados"
      />
    </Box>
  );
};

export default EditarEstado;
