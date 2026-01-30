import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '@/shared/components/formularios/EditarForm';
import { getMostradorPorId, getSectoresActivosPadres, updateMostrador } from '@/features/mostradores/controllers/mostradoresController';
import type { CampoConfig, CampoOption } from '@/domain/models/forms';
import type { Id } from '@/domain/models/common';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const EditarMostrador = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [opcionesSectores, setOpcionesSectores] = useState<CampoOption[]>([]);

  useEffect(() => {
    setTitulo('Editar Mostrador');
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
      <EditarForm
        campos={campos}
        id={(id ?? '') as Id}
        getPorId={getMostradorPorId}
        onSubmit={(mostradorId, payload, token) => updateMostrador(mostradorId, payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/mostradores"
      />
    </Box>
  );
};

export default EditarMostrador;
