import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { Id } from '@/domain/models/common';

interface SectorItem {
  id?: Id;
  nombre?: string;
}

interface UsuarioItem {
  id: Id;
  nombre: string;
  apellido?: string;
}

interface DerivarDialogProps {
  open: boolean;
  sectores: SectorItem[];
  usuarios: UsuarioItem[];
  sectorSeleccionado?: Id | '' | null;
  usuarioSeleccionado?: Id | '' | null;
  onSectorChange: (value: Id | '') => void;
  onUsuarioChange: (value: Id | '') => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const DerivarDialog = ({
  open,
  sectores,
  usuarios,
  sectorSeleccionado,
  usuarioSeleccionado,
  onSectorChange,
  onUsuarioChange,
  onConfirm,
  onCancel,
}: DerivarDialogProps) => {
  return (
    <Dialog open={open} onClose={() => undefined} disableEscapeKeyDown fullWidth maxWidth="sm">
      <DialogTitle>Derivar Ticket</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Seleccione el sector destino y, si lo desea, el usuario específico.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="sector-label">Sector destino</InputLabel>
            <Select
              labelId="sector-label"
              value={sectorSeleccionado ?? ''}
              onChange={(e) => onSectorChange(e.target.value as Id | '')}
              required
              label="Sector destino"
            >
              {sectores.map((s, idx) => (
                <MenuItem key={s.id ?? idx} value={s.id ?? ''}>
                  {s.nombre ?? '—'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!usuarios.length}>
            <InputLabel id="usuario-label">Usuario (opcional)</InputLabel>
            <Select
              labelId="usuario-label"
              value={usuarioSeleccionado ?? ''}
              onChange={(e) => onUsuarioChange(e.target.value as Id | '')}
              label="Usuario (opcional)"
            >
              <MenuItem value="">— Ninguno —</MenuItem>
              {usuarios.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.nombre} {u.apellido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onConfirm} variant="contained" color="warning">
          Confirmar derivación
        </Button>
        <Button onClick={onCancel} variant="outlined" color="inherit">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DerivarDialog;
