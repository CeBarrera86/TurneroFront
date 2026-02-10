import React from 'react';
import { Box } from '@mui/material';

interface TicketBoardProps {
  children: React.ReactNode;
}

const TicketBoard = ({ children }: TicketBoardProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default TicketBoard;
