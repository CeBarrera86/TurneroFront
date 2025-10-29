import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '../../components/formularios/CrearForm';
import { createMostrador } from '../../services/mostradorService';
import { getSectoresActivosPadres } from '../../services/sectorService';

const CrearMostrador = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const [opcionesSectores, setOpcionesSectores] = useState([]);

  useEffect(() => {
    setTitulo('Crear Mostrador');
    const token = sessionStorage.getItem('token');
    getSectoresActivosPadres(token).then((data) => {
      const opciones = data.map((s) => ({ value: s.id, label: `${s.nombre} (${s.letra})` }));
      setOpcionesSectores(opciones);
    });
  }, [setTitulo]);

  const campos = [
    { nombre: 'numero', label: 'Número', tipo: 'number', requerido: true },
    { nombre: 'ip', label: 'IP', tipo: 'text', requerido: true },
    { nombre: 'tipo', label: 'Tipo', tipo: 'text', requerido: false },
    { nombre: 'sectorId', label: 'Sector', tipo: 'select', opciones: opcionesSectores, requerido: true }
  ];

  const handleSuccess = () => { navigate('/mostradores'); };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createMostrador(payload, token)}
        onSuccess={handleSuccess}
        volverA="/mostradores"
      />
    </Box>
  );
};

export default CrearMostrador;