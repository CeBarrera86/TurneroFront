import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import ConfirmDialog from '../../components/dialogos/ConfirmDialog';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import TablaContenidos from '../../components/tablas/TablaContenidos';
import { getContenidos, deleteContenido } from '../../services/contenidoService';

const Contenidos = () => {
  const { setTitulo } = useOutletContext();
  const [archivos, setArchivos] = useState([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [archivoAEliminar, setArchivoAEliminar] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const nuevoRef = useRef(null);

  useEffect(() => {
    setTitulo('Difusiones');
    cargarArchivos();
  }, [setTitulo, page, rowsPerPage]);

  const cargarArchivos = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const res = await getContenidos(token, page, rowsPerPage);
      setArchivos(res.archivos);
      setTotal(res.total);
    } catch (err) {
      setErrorDialog(err.message);
    }
  };

  const handleDeleteClick = (nombre) => {
    setArchivoAEliminar(nombre);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await deleteContenido(archivoAEliminar, token);
      cargarArchivos();
    } catch (err) {
      setErrorDialog(err.message);
    } finally {
      setConfirmDialogOpen(false);
      setArchivoAEliminar(null);
    }
  };

  const handleToggleActivo = async (nombre) => {
    const token = sessionStorage.getItem('token');
    try {
      await toggleContenido(nombre, token);
      cargarArchivos();
    } catch (err) {
      setErrorDialog(err.message);
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
            archivos={archivos}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            total={total}
            onPageChange={(e, newPage) => setPage(newPage + 1)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(1);
            }}
            onToggleActivo={handleToggleActivo}
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
          setTimeout(() => { nuevoRef.current?.focus(); }, 0);
        }}
      />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Contenidos;