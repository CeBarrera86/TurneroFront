import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '@/shared/components/formularios/EditarForm';
import { getSectorPorId, getSectores, updateSector } from '@/features/sectores/controllers/sectoresController';
import type { CampoConfig, CampoOption } from '@/domain/models/forms';
import type { Id } from '@/domain/models/common';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const EditarSector = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [opcionesPadre, setOpcionesPadre] = useState<CampoOption[]>([]);

  useEffect(() => {
    setTitulo('Editar Sector');
    const token = sessionStorage.getItem('token') ?? '';
    const idNum = id ? parseInt(id, 10) : NaN;
    getSectores(token)
      .then((data) => {
        const padres = data
          .filter((s) => s.padreId === null && s.id !== idNum)
          .map((s) => ({ value: s.id as any, label: s.nombre ?? '—' }));
        setOpcionesPadre(padres);
      })
      .catch((err) => console.error('Error al cargar padres:', err));
  }, [setTitulo, id]);

  const campos: CampoConfig[] = [
    { nombre: 'padreId', label: 'Padre', tipo: 'select', opciones: opcionesPadre },
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: false },
    { nombre: 'nombre', label: 'Nombre', tipo: 'text', requerido: false },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true },
    { nombre: 'activo', label: 'Activo', tipo: 'checkbox' },
  ];

  const handleSuccess = () => {
    navigate('/sectores');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <EditarForm
        campos={campos}
        id={(id ?? '') as Id}
        getPorId={getSectorPorId}
        onSubmit={(sectorId, payload, token) => updateSector(sectorId, payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/sectores"
      />
    </Box>
  );
};

export default EditarSector;
