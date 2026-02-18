import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '@/shared/components/formularios/CrearForm';
import { createEstado } from '@/features/estados/controllers/estadosController';
import type { CampoConfig } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearEstado = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Crear Estado');
  }, [setTitulo]);

  const campos: CampoConfig[] = [
    { nombre: 'letra', label: 'Letra', tipo: 'text', requerido: true },
    { nombre: 'descripcion', label: 'Descripción', tipo: 'text', requerido: true },
  ];

  const handleSuccess = () => {
    navigate('/turnero/estados');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => {
          // Adaptar payload a la estructura esperada por la API
          let letra = '';
          let descripcion = '';
          if (payload instanceof FormData) {
            letra = payload.get('letra') as string || '';
            descripcion = payload.get('descripcion') as string || '';
          } else {
            letra = (payload as any).letra ?? '';
            descripcion = (payload as any).descripcion ?? '';
          }
          const adaptado = {
            letra,
            descripcion,
          };
          return createEstado(adaptado, token ?? '');
        }}
        onSuccess={handleSuccess}
        volverA="/turnero/estados"
      />
    </Box>
  );
};

export default CrearEstado;
