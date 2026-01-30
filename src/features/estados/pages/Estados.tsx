import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '@/shared/components/botones/NuevoButton';
import TablaListado, { type TablaColumn } from '@/shared/components/tablas/TablaListado';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import { deleteEstado, getEstados } from '@/features/estados/controllers/estadosController';
import type { Id } from '@/domain/models/common';
import type { Estado } from '@/domain/models/estado';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const Estados = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const [estados, setEstados] = useState<Estado[]>([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [estadoAEliminar, setEstadoAEliminar] = useState<Id | null>(null);
  const nuevoEstadoRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Estados');
    const token = sessionStorage.getItem('token') ?? '';
    getEstados(token).then(setEstados).catch((err) => console.error('Error al cargar estados:', err));
  }, [setTitulo]);

  const handleEdit = (id: Id) => {
    navigate(`/estados/editar/${id}`);
  };

  const handleDeleteClick = (id: Id) => {
    setEstadoAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!estadoAEliminar) return;
    try {
      await deleteEstado(estadoAEliminar, token);
      setEstados((prev) => prev.filter((e) => e.id !== estadoAEliminar));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    } finally {
      setConfirmDialogOpen(false);
      setEstadoAEliminar(null);
    }
  };

  const columns: TablaColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Letra', key: 'letra' },
    { label: 'Descripción', key: 'descripcion' },
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid>
              <NuevoButton ref={nuevoEstadoRef} label="Nuevo Estado" to="/estados/crear" />
            </Grid>
          </Grid>

          <TablaListado columns={columns} rows={estados as any} onEdit={handleEdit} onDelete={handleDeleteClick} />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar estado?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setTimeout(() => {
            nuevoEstadoRef.current?.focus();
          }, 0);
        }}
      />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Estados;
