import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ErrorDialogProps {
  open: boolean;
  mensaje: string;
  onClose: () => void;
}

const ErrorDialog = ({ open, mensaje, onClose }: ErrorDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{mensaje}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
