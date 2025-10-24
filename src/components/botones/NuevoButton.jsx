import React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NuevoButton = ({ label, to }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => navigate(to)}
      sx={{ mb: 1 }}
    >
      {label}
    </Button>
  );
};

export default NuevoButton;