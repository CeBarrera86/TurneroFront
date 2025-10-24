import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, } from '@mui/material';

const ErrorDialog = ({ open, mensaje, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{mensaje}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
