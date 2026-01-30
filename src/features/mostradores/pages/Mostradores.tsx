import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '@/shared/components/botones/NuevoButton';
import TablaListado, { type TablaColumn } from '@/shared/components/tablas/TablaListado';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import { deleteMostrador, getMostradores } from '@/features/mostradores/controllers/mostradoresController';
import type { Id } from '@/domain/models/common';
import type { Mostrador } from '@/domain/models/mostrador';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const Mostradores = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const [mostradores, setMostradores] = useState<Mostrador[]>([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [mostradorAEliminar, setMostradorAEliminar] = useState<Id | null>(null);
  const nuevoRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Mostradores');
    const token = sessionStorage.getItem('token') ?? '';
    getMostradores(token)
      .then(setMostradores)
      .catch((err) => console.error('Error al cargar mostradores:', err));
  }, [setTitulo]);

  const handleEdit = (id: Id) => {
    navigate(`/mostradores/editar/${id}`);
  };

  const handleDeleteClick = (id: Id) => {
    setMostradorAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!mostradorAEliminar) return;
    try {
      await deleteMostrador(mostradorAEliminar, token);
      setMostradores((prev) => prev.filter((m) => m.id !== mostradorAEliminar));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    } finally {
      setConfirmDialogOpen(false);
      setMostradorAEliminar(null);
    }
  };

  const columns: TablaColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Número', key: 'numero' },
    { label: 'IP', key: 'ip' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Sector', key: 'sectorNombre' },
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 700 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid>
              <NuevoButton ref={nuevoRef} label="Nuevo Mostrador" to="/mostradores/crear" />
            </Grid>
          </Grid>

          <TablaListado columns={columns} rows={mostradores as any} onEdit={handleEdit} onDelete={handleDeleteClick} />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar mostrador?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setTimeout(() => {
            nuevoRef.current?.focus();
          }, 0);
        }}
      />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Mostradores;
