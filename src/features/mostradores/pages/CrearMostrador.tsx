import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '@/shared/components/formularios/CrearForm';
import { createMostrador, getSectoresActivosPadres } from '@/features/mostradores/controllers/mostradoresController';
import type { CampoConfig, CampoOption } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearMostrador = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const [opcionesSectores, setOpcionesSectores] = useState<CampoOption[]>([]);

  useEffect(() => {
    setTitulo('Crear Mostrador');
    const token = sessionStorage.getItem('token') ?? '';
    getSectoresActivosPadres(token).then((data) => {
      const opciones = data
        .filter((s) => s.id !== undefined)
        .map((s) => ({ value: s.id as number | string, label: `${s.nombre ?? '—'} (${s.letra ?? '—'})` }));
      setOpcionesSectores(opciones);
    });
  }, [setTitulo]);

  const campos: CampoConfig[] = [
    { nombre: 'numero', label: 'Número', tipo: 'number', requerido: true },
    { nombre: 'ip', label: 'IP', tipo: 'text', requerido: true },
    { nombre: 'tipo', label: 'Tipo', tipo: 'text', requerido: false },
    { nombre: 'sectorId', label: 'Sector', tipo: 'select', opciones: opcionesSectores, requerido: true },
  ];

  const handleSuccess = () => {
    navigate('/mostradores');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createMostrador(payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/mostradores"
      />
    </Box>
  );
};

export default CrearMostrador;
