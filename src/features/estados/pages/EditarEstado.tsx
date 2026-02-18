import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import EditarForm from '@/shared/components/formularios/EditarForm';
import { getEstadoPorLetra, updateEstado } from '@/features/estados/controllers/estadosController';
import type { CampoConfig } from '@/domain/models/forms';
import type { Id } from '@/domain/models/common';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const EditarEstado = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const { id: letra } = useParams();

  useEffect(() => {
    setTitulo('Editar Estado');
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
      <EditarForm
        campos={campos}
        id={letra ?? ''}
        getPorId={async (letraParam, token) => {
          // Obtener el estado y mapear a los nombres de campos del formulario
          const data: any = await getEstadoPorLetra(letraParam, token);
          return {
            letra: data.TUE_LETRA ?? data.letra ?? '',
            descripcion: data.TUE_DESCRIPCION ?? data.descripcion ?? '',
          };
        }}
        onSubmit={async (letraParam, payload, token) => {
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
          return updateEstado(letraParam, adaptado, token ?? '');
        }}
        onSuccess={handleSuccess}
        volverA="/turnero/estados"
      />
    </Box>
  );
};

export default EditarEstado;
