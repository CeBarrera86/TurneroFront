import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import TablaListado from '../../components/tablas/TablaListado';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import { getSectores, deleteSector } from '../../services/sectorService';

const Sectores = () => {
  const { setTitulo } = useOutletContext();
  const [sectores, setSectores] = useState([]);
  const [errorDialog, setErrorDialog] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Sectores');
    const token = sessionStorage.getItem('token');
    getSectores(token)
      .then((data) => {
        const sectoresConPadre = data.map((s) => ({
          ...s,
          nombrePadre: s.padre?.nombre || '—',
          letra: s.letra || '—',
          nombre: s.nombre || '—',
          descripcion: s.descripcion || '—',
          activo: s.activo ? 'Sí' : 'No',
        }));
        setSectores(sectoresConPadre);
      })
      .catch((err) => console.error('Error al cargar sectores:', err));
  }, [setTitulo]);

  const handleEdit = (id) => {
    navigate(`/sectores/editar/${id}`);
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      await deleteSector(id, token);
      setSectores((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setErrorDialog(err.message);
    }
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Padre', key: 'nombrePadre' },
    { label: 'Letra', key: 'letra' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Activo', key: 'activo' }
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1000 }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid>
              <Typography variant="h5">Listado</Typography>
            </Grid>
            <Grid>
              <NuevoButton label="Nuevo Sector" to="/sectores/crear" />
            </Grid>
          </Grid>

          <TablaListado
            columns={columns}
            rows={sectores}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Box>

      <ErrorDialog
        open={!!errorDialog}
        mensaje={errorDialog}
        onClose={() => setErrorDialog('')}
      />
    </Container>
  );
};

export default Sectores;