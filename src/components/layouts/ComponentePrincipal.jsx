import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavbarAuth from './NavbarAuth.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

const sidebarWidth = 230;

const ComponentePrincipal = ({ children }) => {
  const theme = useTheme();
  const sidebarOffset = sidebarWidth + theme.spacing(3);
  const [titulo, setTitulo] = useState('');

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: theme.palette.background.default }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: `${sidebarOffset}px` }}>
        <NavbarAuth titulo={titulo} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '12px',
          }}
        >
          <Outlet context={{ setTitulo }} />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default ComponentePrincipal;