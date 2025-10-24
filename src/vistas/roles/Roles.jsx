import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import TablaListado from '../../components/tablas/TablaListado';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import { getRoles, deleteRol } from '../../services/rolService';

const Roles = () => {
  const { setTitulo } = useOutletContext();
  const [roles, setRoles] = useState([]);
  const [errorDialog, setErrorDialog] = useState('');
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

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      await deleteRol(id, token);
      setRoles((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setErrorDialog(err.message);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid item>
              <NuevoButton label="Nuevo Rol" to="/roles/crear" />
            </Grid>
          </Grid>

          <TablaListado
            columns={['ID', 'Tipo']}
            rows={roles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Box>

      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Roles;
