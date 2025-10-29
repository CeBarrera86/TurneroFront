import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '../../components/formularios/EditarForm';
import { getUsuarioPorId, updateUsuario, getRoles } from '../../services/usuarioService';

const EditarUsuario = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [opcionesRol, setOpcionesRol] = useState([]);

  useEffect(() => {
    setTitulo('Editar Usuario');
    const token = sessionStorage.getItem('token');
    getRoles(token)
      .then((data) => {
        const opciones = data.map((r) => ({ value: r.id, label: r.tipo }));
        setOpcionesRol(opciones);
      })
      .catch((err) => console.error('Error al cargar roles:', err));
  }, [setTitulo]);

  const campos = [
    { nombre: 'nombre', label: 'Nombre', tipo: 'text', requerido: true },
    { nombre: 'apellido', label: 'Apellido', tipo: 'text', requerido: true },
    { nombre: 'username', label: 'Username', tipo: 'text', requerido: true },
    { nombre: 'rolId', label: 'Rol', tipo: 'select', opciones: opcionesRol, requerido: true }
  ];

  const handleSuccess = () => {
    navigate('/usuarios');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        id={id}
        getPorId={getUsuarioPorId}
        onSubmit={(id, payload, token) => updateUsuario(id, payload, token)}
        onSuccess={handleSuccess}
        volverA="/usuarios"
      />
    </Box>
  );
};

export default EditarUsuario;
