import React from 'react';
import { Button, type ButtonProps } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NuevoButtonProps extends ButtonProps {
  label: string;
  to: string;
}

const NuevoButton = React.forwardRef<HTMLButtonElement, NuevoButtonProps>(({ label, to, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <Button
      ref={ref}
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => navigate(to)}
      sx={{ mb: 1 }}
      {...props}
    >
      {label}
    </Button>
  );
});

NuevoButton.displayName = 'NuevoButton';

export default NuevoButton;
