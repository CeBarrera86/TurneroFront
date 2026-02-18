import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  styled,
  Menu,
  MenuItem,
} from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, Person as PersonIcon } from '@mui/icons-material';
import { ThemeModeContext } from '@/app/providers/ThemeModeContext';
import { alpha, useTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0 10px 30px rgba(16, 24, 40, 0.08)',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    height: '70px',
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

interface NavbarAuthProps {
  titulo?: string;
}

const NavbarAuth = ({ titulo }: NavbarAuthProps) => {
  const [name, setName] = useState('Desconocido');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const { mode, toggleMode } = useContext(ThemeModeContext);
  const theme = useTheme();

  useEffect(() => {
    const storedName = sessionStorage.getItem('nombre');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
      <Toolbar sx={{ minHeight: '56px', height: '56px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.5,
              borderRadius: 999,
              border: '1px solid',
              borderColor: 'success.main',
              bgcolor: alpha(theme.palette.success.main, theme.palette.mode === 'dark' ? 0.22 : 0.18),
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {titulo || 'Atención al Público'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 1, height: 28, bgcolor: 'divider' }} />
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Bienvenido,
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
          </Box>
          
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={toggleMode}
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 6px 16px rgba(16, 24, 40, 0.08)',
            }}
            aria-label={mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {mode === 'dark' ? (
              <LightModeIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
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
