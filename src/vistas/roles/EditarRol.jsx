import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '../../components/formularios/EditarForm';
import { getRolPorId, updateRol } from '../../services/rolService';

const EditarRol = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => { setTitulo('Editar Rol'); }, [setTitulo]);

  const campos = [ { nombre: 'tipo', label: 'Tipo de Rol', tipo: 'text', requerido: true } ];

  const handleSuccess = () => { navigate('/roles'); };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        id={id}
        getPorId={getRolPorId}
        onSubmit={(id, payload, token) => updateRol(id, payload, token)}
        onSuccess={handleSuccess}
        volverA="/roles"
      />
    </Box>
  );
};

export default EditarRol;