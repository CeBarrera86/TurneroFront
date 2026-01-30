import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { createSector, getSectores } from '@/features/sectores/controllers/sectoresController';
import CrearForm from '@/shared/components/formularios/CrearForm';
import type { CampoConfig, CampoOption } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearSector = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const [opcionesPadre, setOpcionesPadre] = useState<CampoOption[]>([]);

  useEffect(() => {
    setTitulo('Crear Sector');
    const token = sessionStorage.getItem('token') ?? '';
    getSectores(token)
      .then((data) => {
        const padres = data
          .filter((s) => s.padreId === null)
          .map((s) => ({ value: s.id as any, label: s.nombre ?? '—' }));
        setOpcionesPadre(padres);
      })
      .catch((err) => console.error('Error al cargar padres:', err));
  }, [setTitulo]);

  const campos: CampoConfig[] = [
    { nombre: 'padreId', label: 'Padre', tipo: 'select', opciones: opcionesPadre },
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: false },
    { nombre: 'nombre', label: 'Nombre', tipo: 'text', requerido: false },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true },
    { nombre: 'activo', label: 'Activo', tipo: 'checkbox', default: true },
  ];

  const handleSuccess = () => {
    navigate('/sectores');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createSector(payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/sectores"
      />
    </Box>
  );
};

export default CrearSector;
