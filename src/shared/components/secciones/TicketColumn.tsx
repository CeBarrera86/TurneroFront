import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface TicketColumnProps {
  title: string;
  count?: number;
  subtitle?: string;
  accentColor?: string;
  children: React.ReactNode;
}

const TicketColumn = ({ title, count, subtitle, accentColor, children }: TicketColumnProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 240,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ height: 3, bgcolor: accentColor ?? 'divider' }} />
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {typeof count === 'number' ? (
          <Box
            sx={{
              minWidth: 24,
              height: 24,
              px: 1,
              borderRadius: 999,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.text.primary, 0.08)
                  : theme.palette.grey[100],
              border: (theme) =>
                theme.palette.mode === 'dark'
                  ? `1px solid ${alpha(theme.palette.text.primary, 0.18)}`
                  : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {count}
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default TicketColumn;
