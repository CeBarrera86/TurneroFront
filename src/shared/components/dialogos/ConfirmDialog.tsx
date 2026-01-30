import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title || '¿Confirmar acción?'}</DialogTitle>
      <DialogContent>{message || 'Esta acción no se puede deshacer.'}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onConfirm();
          }}
          color="error"
          variant="contained"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
