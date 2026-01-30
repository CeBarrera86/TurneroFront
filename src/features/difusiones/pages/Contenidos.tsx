import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import NuevoButton from '@/shared/components/botones/NuevoButton';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import TablaContenidos from '@/shared/components/tablas/TablaContenidos';
import { deleteContenido, getContenidos, updateContenido } from '@/features/difusiones/controllers/contenidosController';
import type { Id } from '@/domain/models/common';
import type { Contenido } from '@/domain/models/contenido';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const Contenidos = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const [archivos, setArchivos] = useState<Contenido[]>([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [archivoAEliminar, setArchivoAEliminar] = useState<Id | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const nuevoRef = useRef<HTMLButtonElement | null>(null);

  const cargarArchivos = useCallback(async () => {
    const token = sessionStorage.getItem('token') ?? '';
    try {
      const res = await getContenidos(token);
      setArchivos(res);
      setTotal(res.length);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    }
  }, []);

  useEffect(() => {
    setTitulo('Difusiones');
    cargarArchivos();
  }, [setTitulo, page, rowsPerPage, cargarArchivos]);

  const handleDeleteClick = (id: Id) => {
    setArchivoAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!archivoAEliminar) return;
    try {
      await deleteContenido(archivoAEliminar, token);
      cargarArchivos();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    } finally {
      setConfirmDialogOpen(false);
      setArchivoAEliminar(null);
    }
  };

  const handleCheckActivo = async (id: Id) => {
    const token = sessionStorage.getItem('token') ?? '';
    const contenido = archivos.find((a) => a.id === id);
    if (!contenido) return;

    try {
      await updateContenido(id, { activa: !contenido.activa } as any, token);
      cargarArchivos();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid>
              <NuevoButton ref={nuevoRef} label="Nueva Contenido" to="/difusiones/crear" />
            </Grid>
          </Grid>

          <TablaContenidos
            archivos={archivos as any}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            total={total}
            onPageChange={(_, newPage) => setPage(newPage + 1)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(1);
            }}
            onToggleActivo={handleCheckActivo}
            onDelete={handleDeleteClick}
          />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar contenido?"
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

export default Contenidos;
