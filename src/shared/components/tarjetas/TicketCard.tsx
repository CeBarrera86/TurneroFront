import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CheckCircle as CheckIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Id } from '@/domain/models/common';

interface TicketCardItem {
  id?: Id;
  numero: string | number;
  nombre: string;
}

interface TicketCardProps {
  ticket: TicketCardItem;
  onAtender: (ticket: TicketCardItem) => void;
  onEliminar: (ticket: TicketCardItem) => void;
}

const TicketCard = ({ ticket, onAtender, onEliminar }: TicketCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1.5,
        borderBottom: '1px solid #eee',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {ticket.numero}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ticket.nombre}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={() => onAtender(ticket)}>
          <CheckIcon color="success" />
        </IconButton>
        <IconButton onClick={() => onEliminar(ticket)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TicketCard;
