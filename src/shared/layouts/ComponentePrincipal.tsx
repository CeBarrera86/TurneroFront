import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavbarAuth from './NavbarAuth';
import Sidebar from './Sidebar';
import Footer from './Footer';

const sidebarWidth = 250;
const collapsedWidth = 118;
const navbarHeight = 70;
const footerHeight = 70;

interface ComponentePrincipalProps {
  children?: React.ReactNode;
}

const ComponentePrincipal = ({ children }: ComponentePrincipalProps) => {
  const theme = useTheme();
  const [titulo, setTitulo] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${isSidebarCollapsed ? collapsedWidth : sidebarWidth}px 1fr`,
        gridTemplateRows: `${navbarHeight}px 1fr ${footerHeight}px`,
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ gridColumn: 1, gridRow: '1 / span 3', height: '100%', minHeight: 0 }}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
      </Box>
      <Box sx={{ gridColumn: 2, gridRow: 1, height: `${navbarHeight}px` }}>
        <NavbarAuth titulo={titulo} />
      </Box>
      <Box
        component="main"
        sx={{
          gridColumn: 2,
          gridRow: 2,
          p: 2,
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '12px',
        }}
      >
        <Outlet context={{ setTitulo }} />
        {children}
      </Box>
      <Box sx={{ gridColumn: 2, gridRow: 3, height: `${footerHeight}px` }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ComponentePrincipal;
