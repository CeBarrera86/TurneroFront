import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { createSector } from '../../services/sectorService';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    const payload = { ...formData };
    if (payload.padreId === '') payload.padreId = null;
    if (typeof payload.activo === 'string') payload.activo = payload.activo === 'true';
    ['letra', 'nombre', 'descripcion'].forEach((campo) => {
      if (payload[campo] === '') payload[campo] = null;
    });

    try {
      const data = await createSector(payload, token);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error al crear sector:', err);
    }
  };

  const handleSuccess = () => {
    navigate('/sectores');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createSector(payload, token)}
        onSuccess={handleSuccess}
        volverA="/sectores"
      />
    </Box>
  );
};

export default CrearSector;