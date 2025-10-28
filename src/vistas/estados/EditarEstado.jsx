import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '../../components/formularios/EditarForm';
import { updateEstado, getEstadoPorId } from '../../services/estadoService';

const EditarEstado = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => { setTitulo('Editar Estado'); }, [setTitulo]);

  const campos = [
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: true },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true }
  ];

  const handleSuccess = () => { navigate('/estados'); };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        id={id}
        getPorId={getEstadoPorId}
        onSubmit={(id, payload, token) => updateEstado(id, payload, token)}
        onSuccess={handleSuccess}
        volverA="/estados"
      />
    </Box>
  );
};

export default EditarEstado;