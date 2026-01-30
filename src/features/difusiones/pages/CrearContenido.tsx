import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '@/shared/components/formularios/CrearForm';
import { createContenido } from '@/features/difusiones/controllers/contenidosController';
import type { CampoConfig } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearContenido = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Agregar Contenido');
  }, [setTitulo]);

  const campos: CampoConfig[] = [
    {
      nombre: 'archivos',
      tipo: 'file-multiple',
      label: 'Archivos',
      maxSizeMB: 20,
    },
  ];

  const handleSubmit = async (payload: FormData | Record<string, unknown>, token: string | null) => {
    try {
      if (!(payload instanceof FormData)) {
        throw new Error('Payload inválido para carga de contenido');
      }
      const data = await createContenido(payload, token ?? '');
      return data;
    } catch (err) {
      console.error('Error al crear contenido:', err);
      throw err;
    }
  };

  const handleSuccess = () => {
    navigate('/difusiones');
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <CrearForm campos={campos} onSubmit={handleSubmit} onSuccess={handleSuccess} volverA="/difusiones" />
    </Box>
  );
};

export default CrearContenido;
