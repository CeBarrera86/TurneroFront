import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Box,
  styled,
  Menu,
  MenuItem
} from '@mui/material';
import { Search as SearchIcon, Person as PersonIcon } from '@mui/icons-material';

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

const NavbarAuth = () => {
  const [name, setName] = useState('Desconocido');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedName = sessionStorage.getItem('nombre');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setName('Desconocido');
    handleClose();
    window.location.href = '/login';
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ minHeight: '60px', height: '60px' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Atención al Público
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <InputBase
            placeholder="Buscar Ticket..."
            sx={{ border: '1px solid #ccc', borderRadius: '20px', padding: '4px 12px', width: '200px', }} />
          <IconButton sx={{ ml: 1, color: 'white', backgroundColor: 'corpico.verde', '&:hover': { backgroundColor: 'corpico.verde' } }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 1 }}>Hola {name}</Typography>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ bgcolor: 'grey' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout} sx={{ color: 'text.third' }}>
            Salir
          </MenuItem>
        </Menu>
      </Toolbar>
      <GradientLine />
    </StyledAppBar>
  );
};

export default NavbarAuth;