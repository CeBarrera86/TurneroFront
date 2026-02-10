import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        color: 'text.secondary',
        bgcolor: (theme) => alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.04 : 0.03),
      }}
    >
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
};

export default EmptyState;
