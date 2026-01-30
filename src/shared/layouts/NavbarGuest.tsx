import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
} from '@mui/material';
import Logo from '@/assets/img/corpico_logo.svg';

const StyledAppBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(0, 0, 0, .4)',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    height: '65px',
  };
});

const GradientLine = styled(Box)(({ theme }) => {
  const borderColorsForGradient = [
    theme.palette.corpico.azul,
    theme.palette.corpico.violeta,
    theme.palette.corpico.rojo,
    theme.palette.corpico.naranja,
    theme.palette.corpico.amarillo,
    theme.palette.corpico.verde,
    theme.palette.corpico.celeste,
  ];

  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: `linear-gradient(to right, ${borderColorsForGradient.join(', ')})`,
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  };
});

const NavbarGuest = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar
        sx={{ minHeight: '60px', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={Logo} alt="Corpico" sx={{ height: 40, mr: 1 }} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Gestión de Turnos
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={Logo} alt="Corpico" sx={{ height: 40, mr: 1, visibility: 'hidden' }} />
        </Box>
      </Toolbar>
      <GradientLine />
    </StyledAppBar>
  );
};

export default NavbarGuest;
