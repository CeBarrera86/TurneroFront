import React from 'react';
import { Box, Chip, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface SeccionHeaderProps {
  title: string;
  total: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusLabel?: string;
  updatedLabel?: string;
  searchPlaceholder?: string;
}

const SeccionHeader = ({
  title,
  total,
  searchValue,
  onSearchChange,
  statusLabel,
  updatedLabel,
  searchPlaceholder,
}: SeccionHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Chip
            size="small"
            label={`${total} Total`}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.08 : 0.06),
              color: 'text.secondary',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.18 : 0.08),
            }}
          />
          {statusLabel ? (
            <Chip
              size="small"
              label={statusLabel}
              sx={{ bgcolor: 'success.light', color: 'success.dark', fontWeight: 600 }}
            />
          ) : null}
        </Box>
        {updatedLabel ? (
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.75, display: 'block' }}>
            {updatedLabel}
          </Typography>
        ) : null}
      </Box>

      <TextField
        size="small"
        placeholder={searchPlaceholder ?? 'Buscar ticket...'}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: { xs: '100%', md: 260 } }}
      />
    </Box>
  );
};

export default SeccionHeader;
