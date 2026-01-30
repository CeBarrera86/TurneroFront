import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface TicketCliente {
  titular?: string;
  dni?: string;
}

interface TicketAtencion {
  codigo: string;
  sector: string;
  cliente?: TicketCliente;
  estado: string;
}

interface AtencionDialogProps {
  open: boolean;
  ticket?: TicketAtencion | null;
  onFinalizar: () => void;
  onDerivar: () => void;
  onRellamar: () => void;
}

const AtencionDialog = ({ open, ticket, onFinalizar, onDerivar, onRellamar }: AtencionDialogProps) => {
  if (!ticket) return null;

  return (
    <Dialog open={open} onClose={() => undefined} disableEscapeKeyDown fullWidth maxWidth="sm">
      <DialogTitle>Atendiendo ticket {ticket.codigo}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Sector:</strong> {ticket.sector}
          </Typography>
          <Typography>
            <strong>Cliente:</strong> {ticket.cliente?.titular ?? '—'}
          </Typography>
          <Typography>
            <strong>DNI:</strong> {ticket.cliente?.dni ?? '—'}
          </Typography>
          <Typography>
            <strong>Estado:</strong> {ticket.estado}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onFinalizar} color="success" variant="contained">
          Finalizar
        </Button>
        <Button onClick={onDerivar} color="warning" variant="contained">
          Derivar
        </Button>
        <Button onClick={onRellamar} color="info" variant="contained">
          Rellamar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AtencionDialog;
