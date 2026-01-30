import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '@/shared/components/botones/NuevoButton';
import TablaListado, { type TablaColumn } from '@/shared/components/tablas/TablaListado';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import { deleteRol, getRoles } from '@/features/roles/controllers/rolesController';
import type { Id } from '@/domain/models/common';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const Roles = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const [roles, setRoles] = useState<any[]>([]);
  const [errorDialog, setErrorDialog] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rolAEliminar, setRolAEliminar] = useState<Id | null>(null);
  const nuevoRolRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitulo('Roles');
    const token = sessionStorage.getItem('token') ?? '';
    getRoles(token)
      .then(setRoles)
      .catch((err) => console.error('Error al cargar roles:', err));
  }, [setTitulo]);

  const handleEdit = (id: Id) => {
    navigate(`/roles/editar/${id}`);
  };

  const handleDeleteClick = (id: Id) => {
    setRolAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!rolAEliminar) return;
    try {
      await deleteRol(rolAEliminar, token);
      setRoles((prev) => prev.filter((r) => r.id !== rolAEliminar));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setErrorDialog(message);
    } finally {
      setConfirmDialogOpen(false);
      setRolAEliminar(null);
    }
  };

  const columns: TablaColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Tipo', key: 'tipo' },
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
              <NuevoButton ref={nuevoRolRef} label="Nuevo Rol" to="/roles/crear" />
            </Grid>
          </Grid>

          <TablaListado columns={columns} rows={roles as any} onEdit={handleEdit} onDelete={handleDeleteClick} />
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Eliminar rol?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setTimeout(() => {
            nuevoRolRef.current?.focus();
          }, 0);
        }}
      />
      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
    </Container>
  );
};

export default Roles;
