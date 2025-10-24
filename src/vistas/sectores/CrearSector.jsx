import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '../../components/formularios/CrearForm';
import { getSectores } from '../../services/sectorService';

const CrearSector = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const [opcionesPadre, setOpcionesPadre] = useState([]);

  useEffect(() => {
    setTitulo('Crear Sector');
    const token = sessionStorage.getItem('token');
    getSectores(token)
      .then((data) => {
        const padres = data
          .filter((s) => s.padreId === null)
          .map((s) => ({ value: s.id, label: s.nombre }));
        setOpcionesPadre(padres);
      })
      .catch((err) => console.error('Error al cargar padres:', err));
  }, [setTitulo]);

  const campos = [
    { nombre: 'padreId', label: 'Padre', tipo: 'select', opciones: opcionesPadre },
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: false },
    { nombre: 'nombre', label: 'Nombre', tipo: 'text', requerido: false },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true },
    { nombre: 'activo', label: 'Activo', tipo: 'checkbox', default: true }
  ];

  const handleSuccess = () => {
    navigate('/sectores');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        endpoint="http://172.16.14.87:5144/api/Sector"
        onSuccess={handleSuccess}
        volverA="/sectores"
      />
    </Box>
  );
};

export default CrearSector;