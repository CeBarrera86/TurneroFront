import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '@/shared/components/botones/NuevoButton';
import TablaListado, { type TablaColumn } from '@/shared/components/tablas/TablaListado';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import { deleteUsuario, getUsuarios } from '@/features/usuarios/controllers/usuariosController';
import type { Id } from '@/domain/models/common';
import type { Usuario } from '@/domain/models/usuario';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

interface UsuarioListado extends Usuario {
  nombreCompleto?: string;
  rol?: string;
}

const Usuarios = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const [usuarios, setUsuarios] = useState<UsuarioListado[]>([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Id | null>(null);
  const nuevoUsuarioRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Usuarios');
    const token = sessionStorage.getItem('token') ?? '';
    getUsuarios(token)
      .then((data) => {
        const usuariosConRol = data.map((u) => ({
          ...u,
          nombreCompleto: `${u.nombre ?? ''} ${u.apellido ?? ''}`.trim() || '—',
          rol: u.rolTipo || '—',
          username: u.username || '—',
        }));
        setUsuarios(usuariosConRol);
      })
      .catch((err) => console.error('Error al cargar usuarios:', err));
  }, [setTitulo]);

  const handleEdit = (id: Id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  const handleDeleteClick = (id: Id) => {
    setUsuarioAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!usuarioAEliminar) return;
    try {
      await deleteUsuario(usuarioAEliminar, token);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuarioAEliminar));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    } finally {
      setConfirmDialogOpen(false);
      setUsuarioAEliminar(null);
    }
  };

  const columns: TablaColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombreCompleto' },
    { label: 'Username', key: 'username' },
    { label: 'Rol', key: 'rol' },
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

          <TablaListado columns={columns} rows={usuarios as any} onEdit={handleEdit} onDelete={handleDeleteClick} />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar usuario?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setTimeout(() => {
            nuevoUsuarioRef.current?.focus();
          }, 0);
        }}
      />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Usuarios;
