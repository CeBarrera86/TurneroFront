import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '../../components/formularios/EditarForm';

const EditarRol = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTitulo('Editar Rol');
  }, [setTitulo]);

  const campos = [
    { nombre: 'tipo', label: 'Tipo de Rol', tipo: 'text', requerido: true }
  ];

  const handleSuccess = () => {
    navigate('/roles');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        endpoint="http://172.16.14.87:5144/api/Rol"
        id={id}
        onSuccess={handleSuccess}
        volverA="/roles"
      />
    </Box>
  );
};

export default EditarRol;