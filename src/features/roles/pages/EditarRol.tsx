import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '@/shared/components/formularios/EditarForm';
import { getRolPorId, updateRol } from '@/features/roles/controllers/rolesController';
import type { CampoConfig } from '@/domain/models/forms';
import type { Id } from '@/domain/models/common';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const EditarRol = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTitulo('Editar Rol');
  }, [setTitulo]);

  const campos: CampoConfig[] = [{ nombre: 'tipo', label: 'Tipo de Rol', tipo: 'text', requerido: true }];

  const handleSuccess = () => {
    navigate('/roles');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        id={(id ?? '') as Id}
        getPorId={getRolPorId}
        onSubmit={(rolId, payload, token) => updateRol(rolId, payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/roles"
      />
    </Box>
  );
};

export default EditarRol;
