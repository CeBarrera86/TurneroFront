import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import TablaListado from '../../components/tablas/TablaListado';
import ConfirmDialog from '../../components/dialogos/ConfirmDialog';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import { getUsuarios, deleteUsuario } from '../../services/usuarioService';

const Usuarios = () => {
  const { setTitulo } = useOutletContext();
  const [usuarios, setUsuarios] = useState([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const nuevoUsuarioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Usuarios');
    const token = sessionStorage.getItem('token');
    getUsuarios(token)
      .then((data) => {
        const usuariosConRol = data.map((u) => ({
          ...u,
          nombreCompleto: `${u.nombre} ${u.apellido}`,
          rol: u.rolTipo || '—',
          username: u.username || '—'
        }));
        setUsuarios(usuariosConRol);
      })
      .catch((err) => console.error('Error al cargar usuarios:', err));
  }, [setTitulo]);

  const handleEdit = (id) => { navigate(`/usuarios/editar/${id}`); };

  const handleDeleteClick = (id) => {
    setUsuarioAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await deleteUsuario(usuarioAEliminar, token);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuarioAEliminar));
    } catch (err) {
      setErrorDialog(err.message);
    } finally {
      setConfirmDialogOpen(false);
      setUsuarioAEliminar(null);
    }
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombreCompleto' },
    { label: 'Username', key: 'username' },
    { label: 'Rol', key: 'rol' }
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
              <NuevoButton ref={nuevoUsuarioRef} label="Nuevo Usuario" to="/usuarios/crear" />
            </Grid>
          </Grid>

          <TablaListado
            columns={columns}
            rows={usuarios}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Box>
      </Box>

      <ConfirmDialog open={confirmDialogOpen} title="¿Eliminar usuario?" message="Esta acción no se puede deshacer." onConfirm={handleConfirmDelete} onCancel={() => {
        setConfirmDialogOpen(false);
        setTimeout(() => { nuevoUsuarioRef.current?.focus(); }, 0);
      }} />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Usuarios;