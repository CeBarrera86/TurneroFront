import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '../../components/formularios/EditarForm';
import { updateMostrador, getMostradorPorId } from '../../services/mostradorService';
import { getSectoresActivosPadres } from '../../services/sectorService';

const EditarMostrador = () => {
  const { setTitulo } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [opcionesSectores, setOpcionesSectores] = useState([]);

  useEffect(() => {
    setTitulo('Editar Mostrador');
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
        
      <EditarForm
        campos={campos}
        id={id}
        getPorId={getMostradorPorId}
        onSubmit={(id, payload, token) => updateMostrador(id, payload, token)}
        onSuccess={handleSuccess}
        volverA="/mostradores"
      />
    </Box>
  );
};

export default EditarMostrador;
