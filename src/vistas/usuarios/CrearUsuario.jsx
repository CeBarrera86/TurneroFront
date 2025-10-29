import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '../../components/formularios/CrearForm';
import { createUsuario, getRoles } from '../../services/usuarioService';

const CrearUsuario = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const [opcionesRol, setOpcionesRol] = useState([]);

  useEffect(() => {
    setTitulo('Crear Usuario');
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
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createUsuario(payload, token)}
        onSuccess={handleSuccess}
        volverA="/usuarios"
      />
    </Box>
  );
};

export default CrearUsuario;
