import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '../../components/formularios/EditarForm';
import { getSectores, getSectorPorId, updateSector } from '../../services/sectorService';

const EditarSector = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [opcionesPadre, setOpcionesPadre] = useState([]);

  useEffect(() => {
    setTitulo('Editar Sector');
    const token = sessionStorage.getItem('token');
    getSectores(token)
      .then((data) => {
        const padres = data.filter((s) => s.padreId === null && s.id !== parseInt(id)).map((s) => ({ value: s.id, label: s.nombre }));
        setOpcionesPadre(padres);
      })
      .catch((err) => console.error('Error al cargar padres:', err));
  }, [setTitulo, id]);

  const campos = [
    { nombre: 'padreId', label: 'Padre', tipo: 'select', opciones: opcionesPadre },
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: false },
    { nombre: 'nombre', label: 'Nombre', tipo: 'text', requerido: false },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true },
    { nombre: 'activo', label: 'Activo', tipo: 'checkbox' }
  ];

  const handleSuccess = () => { navigate('/sectores'); };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        id={id}
        getPorId={getSectorPorId}
        onSubmit={(id, payload, token) => updateSector(id, payload, token)}
        onSuccess={handleSuccess}
        volverA="/sectores"
      />
    </Box>
  );
};

export default EditarSector;