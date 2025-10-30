import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Drawer, Box, Divider, IconButton, styled } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import SidebarMenu from './sidebar/SidebarMenu';
import Logo from '../../assets/img/corpico_logo.svg';
import Logo2 from '../../assets/img/corpico_logo2.svg';

const sidebarWidth = 230;
const collapsedWidth = 80;

const StyledDrawer = styled(Drawer)(({ theme, iscollapsed }) => ({
  width: iscollapsed === 'true' ? collapsedWidth : sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: iscollapsed === 'true' ? collapsedWidth : sidebarWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.layout,
    color: theme.palette.text.primary,
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,0,0,.4)',
    position: 'fixed',
    transition: 'width 0.3s ease',
    overflowX: 'hidden',
  },
}));

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <StyledDrawer variant="permanent" anchor="left" iscollapsed={isCollapsed.toString()}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isCollapsed ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          px: 2,
          py: 2,
        }}
      >
        {isCollapsed ? (
          <>
            <IconButton onClick={toggleSidebar} sx={{ mb: 1 }}>
              <ChevronRight />
            </IconButton>
            <img src={Logo2} alt="Corpico" style={{ width: '60%' }} />
          </>
        ) : (
          <>
            <img src={Logo} alt="Corpico" style={{ width: '40%' }} />
            <IconButton onClick={toggleSidebar}>
              <ChevronLeft />
            </IconButton>
          </>
        )}
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)', mx: 2 }} />
      <SidebarMenu isCollapsed={isCollapsed} />
    </StyledDrawer>
  );
};

export default Sidebar;