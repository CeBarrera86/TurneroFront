import React from 'react';
import { Drawer, Box, Divider, IconButton, styled } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import SidebarMenu from './sidebar/SidebarMenu';
import Logo from '@/assets/img/corpico_logo.svg';
import Logo2 from '@/assets/img/corpico_logo2.svg';

const sidebarWidth = 250;
const collapsedWidth = 118;

interface StyledDrawerProps {
  iscollapsed: string;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'iscollapsed',
})<StyledDrawerProps>(({ theme, iscollapsed }) => ({
  width: iscollapsed === 'true' ? collapsedWidth : sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: iscollapsed === 'true' ? collapsedWidth : sidebarWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.layout : theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 10px 30px rgba(16, 24, 40, 0.08)',
    position: 'static',
    margin: 0,
    height: '100vh',
    transition: 'width 0.3s ease',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr',
    minHeight: 0,
  },
}));

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {

  return (
    <StyledDrawer variant="permanent" anchor="left" iscollapsed={isCollapsed.toString()}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isCollapsed ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          px: 2,
          py: 2.5,
          flexShrink: 0,
        }}
      >
        {isCollapsed ? (
          <>
            <IconButton onClick={onToggle} sx={{ mb: 1 }}>
              <ChevronRight />
            </IconButton>
            <Box component="img" src={Logo2} alt="Corpico" sx={{ width: '40%' }} />
          </>
        ) : (
          <>
            <Box component="img" src={Logo} alt="Corpico" sx={{ width: '40%' }} />
            <IconButton onClick={onToggle}>
              <ChevronLeft />
            </IconButton>
          </>
        )}
      </Box>

      <Divider sx={{ bgcolor: 'divider', mx: 2 }} />
      <Box sx={{ overflowY: 'auto', pt: 1, pb: 1, minHeight: 0 }}>
        <SidebarMenu isCollapsed={isCollapsed} />
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
