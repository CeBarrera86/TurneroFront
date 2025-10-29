import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import TablaListado from '../../components/tablas/TablaListado';
import ConfirmDialog from '../../components/dialogos/ConfirmDialog';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import { getMostradores, deleteMostrador } from '../../services/mostradorService';

const Mostradores = () => {
  const { setTitulo } = useOutletContext();
  const [mostradores, setMostradores] = useState([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [mostradorAEliminar, setMostradorAEliminar] = useState(null);
  const nuevoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Mostradores');
    const token = sessionStorage.getItem('token');
    getMostradores(token)
      .then(setMostradores)
      .catch((err) => console.error('Error al cargar mostradores:', err));
  }, [setTitulo]);

  const handleEdit = (id) => { navigate(`/mostradores/editar/${id}`); };

  const handleDeleteClick = (id) => {
    setMostradorAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await deleteMostrador(mostradorAEliminar, token);
      setMostradores((prev) => prev.filter((m) => m.id !== mostradorAEliminar));
    } catch (err) {
      setErrorDialog(err.message);
    } finally {
      setConfirmDialogOpen(false);
      setMostradorAEliminar(null);
    }
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Número', key: 'numero' },
    { label: 'IP', key: 'ip' },
    { label: 'Tipo', key: 'tipo' },
    { label: 'Sector', key: 'sectorNombre' }
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

          <TablaListado
            columns={columns}
            rows={mostradores}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar mostrador?"
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

export default Mostradores;