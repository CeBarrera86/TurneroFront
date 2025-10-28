import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import TablaListado from '../../components/tablas/TablaListado';
import ConfirmDialog from '../../components/dialogos/ConfirmDialog';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import { getRoles, deleteRol } from '../../services/rolService';

const Roles = () => {
  const { setTitulo } = useOutletContext();
  const [roles, setRoles] = useState([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rolAEliminar, setRolAEliminar] = useState(null);
  const nuevoRolRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Roles');
    const token = sessionStorage.getItem('token');
    getRoles(token)
      .then(setRoles)
      .catch((err) => console.error('Error al cargar roles:', err));
  }, [setTitulo]);

  const handleEdit = (id) => {
    navigate(`/roles/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    setRolAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await deleteRol(rolAEliminar, token);
      setRoles((prev) => prev.filter((r) => r.id !== rolAEliminar));
    } catch (err) {
      setErrorDialog(err.message);
    } finally {
      setConfirmDialogOpen(false);
      setRolAEliminar(null);
    }
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Tipo', key: 'tipo' }
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid>
              <NuevoButton ref={nuevoRolRef} label="Nuevo Rol" to="/roles/crear" /> {/* ✅ ref aplicado */}
            </Grid>
          </Grid>

          <TablaListado
            columns={columns}
            rows={roles}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Box>
      </Box>

      <ConfirmDialog open={confirmDialogOpen} title="¿Eliminar rol?" message="Esta acción no se puede deshacer." onConfirm={handleConfirmDelete} onCancel={() => {
        setConfirmDialogOpen(false);
        setTimeout(() => { nuevoRolRef.current?.focus(); }, 0);
      }} />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Roles;