import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '@/shared/components/botones/NuevoButton';
import TablaListado, { type TablaColumn } from '@/shared/components/tablas/TablaListado';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import { deleteSector, getSectores } from '@/features/sectores/controllers/sectoresController';
import type { Id } from '@/domain/models/common';
import type { Sector } from '@/domain/models/sector';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

type SectorListado = Omit<Sector, 'activo'> & {
  nombrePadre?: string;
  activoLabel?: string;
};

const Sectores = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const [sectores, setSectores] = useState<SectorListado[]>([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [sectorAEliminar, setSectorAEliminar] = useState<Id | null>(null);
  const nuevoSectorRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Sectores');
    const token = sessionStorage.getItem('token') ?? '';
    getSectores(token)
      .then((data) => {
        const sectoresConPadre = data.map((s) => ({
          ...s,
          nombrePadre: s.padre?.nombre || '—',
          letra: s.letra || '—',
          nombre: s.nombre || '—',
          descripcion: s.descripcion || '—',
          activoLabel: s.activo ? 'Sí' : 'No',
        }));
        setSectores(sectoresConPadre);
      })
      .catch((err) => console.error('Error al cargar sectores:', err));
  }, [setTitulo]);

  const handleEdit = (id: Id) => {
    navigate(`/sectores/editar/${id}`);
  };

  const handleDeleteClick = (id: Id) => {
    setSectorAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!sectorAEliminar) return;
    try {
      await deleteSector(sectorAEliminar, token);
      setSectores((prev) => prev.filter((s) => s.id !== sectorAEliminar));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    } finally {
      setConfirmDialogOpen(false);
      setSectorAEliminar(null);
    }
  };

  const columns: TablaColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Padre', key: 'nombrePadre' },
    { label: 'Letra', key: 'letra' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Activo', key: 'activoLabel' },
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1100 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid>
              <NuevoButton ref={nuevoSectorRef} label="Nuevo Sector" to="/sectores/crear" />
            </Grid>
          </Grid>

          <TablaListado columns={columns} rows={sectores as any} onEdit={handleEdit} onDelete={handleDeleteClick} />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar sector?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setTimeout(() => {
            nuevoSectorRef.current?.focus();
          }, 0);
        }}
      />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Sectores;
