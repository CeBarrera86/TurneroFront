import React from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Notifications as BellIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface TicketCardProps {
  ticket: string;
  asociado: string;
  onCall: () => void;
  onDelete: () => void;
  highlighted?: boolean;
}

const TicketCard = ({ ticket, asociado, onCall, onDelete, highlighted }: TicketCardProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.75,
        borderRadius: 3,
        borderColor: highlighted ? 'primary.light' : 'divider',
        bgcolor: highlighted ? 'primary.50' : 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          {ticket}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'success.main',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {asociado || '—'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Llamar ticket">
          <IconButton
            size="small"
            onClick={onCall}
            aria-label="Llamar ticket"
            sx={{ bgcolor: 'success.light', color: 'success.dark', '&:hover': { bgcolor: 'success.main', color: 'common.white' } }}
          >
            <BellIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar ticket">
          <IconButton
            size="small"
            onClick={onDelete}
            aria-label="Eliminar ticket"
            sx={{ bgcolor: 'grey.100', color: 'text.secondary', '&:hover': { bgcolor: 'grey.200' } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default TicketCard;
