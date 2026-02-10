import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  List,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavLink, type Location } from 'react-router-dom';
import type { SidebarItemConfig } from './sidebarConfig';
import { alpha } from '@mui/material/styles';

interface SidebarItemProps {
  item: SidebarItemConfig;
  isCollapsed: boolean;
  location: Location;
  openSecciones: boolean;
  openInstitucional: boolean;
  setOpenSecciones: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenInstitucional: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarItem = ({
  item,
  isCollapsed,
  location,
  openSecciones,
  openInstitucional,
  setOpenSecciones,
  setOpenInstitucional,
}: SidebarItemProps) => {
  const isActive = item.path && location.pathname === item.path;
  const isGroupOpen = item.text === 'Secciones' ? openSecciones : openInstitucional;
  const toggleGroup = () => {
    if (item.text === 'Secciones') {
      const next = !openSecciones;
      setOpenSecciones(next);
      if (next) setOpenInstitucional(false);
      return;
    }
    const next = !openInstitucional;
    setOpenInstitucional(next);
    if (next) setOpenSecciones(false);
  };

  if (item.children) {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton
            onClick={toggleGroup}
            sx={{
              mx: 1.5,
              my: 0.5,
              borderRadius: 999,
              minHeight: 44,
              bgcolor: isGroupOpen ? 'transparent' : 'transparent',
              backgroundImage: isGroupOpen
                ? (theme) => `linear-gradient(90deg, ${alpha(theme.palette.success.main, theme.palette.mode === 'dark' ? 0.28 : 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 70%)`
                : 'none',
              color: isGroupOpen ? (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark) : 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              position: 'relative',
              border: isGroupOpen ? '1px solid' : '1px solid transparent',
              borderColor: isGroupOpen ? (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main) : 'transparent',
              '&::after': isGroupOpen
                ? {
                    content: '""',
                    position: 'absolute',
                    right: -8,
                    top: -1,
                    bottom: -1,
                    width: 16,
                    border: '1px solid',
                    borderColor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main),
                    borderLeft: 'none',
                    borderRadius: '0 999px 999px 0',
                    background: 'transparent',
                  }
                : undefined,
              boxShadow: isGroupOpen ? '0 6px 16px rgba(16, 24, 40, 0.08)' : 'none',
            }}
          >
            <Tooltip title={isCollapsed ? item.text : ''} placement="right">
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            </Tooltip>
            {!isCollapsed && <ListItemText primary={item.text} />}
            {!isCollapsed && (isGroupOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  component={child.isExternal ? 'a' : NavLink}
                  to={child.isExternal ? undefined : child.path}
                  href={child.isExternal ? child.path : undefined}
                  target={child.isExternal ? '_blank' : undefined}
                  rel={child.isExternal ? 'noopener noreferrer' : undefined}
                  sx={{
                    pl: 4,
                    mx: 1.5,
                    my: 0.5,
                    borderRadius: 999,
                    minHeight: 40,
                    bgcolor: location.pathname === child.path ? 'transparent' : 'transparent',
                    backgroundImage: location.pathname === child.path
                      ? (theme) => `linear-gradient(90deg, ${alpha(theme.palette.success.main, theme.palette.mode === 'dark' ? 0.28 : 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 70%)`
                      : 'none',
                    color: location.pathname === child.path ? (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark) : 'text.primary',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    position: 'relative',
                    border: location.pathname === child.path ? '1px solid' : '1px solid transparent',
                    borderColor: location.pathname === child.path ? (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main) : 'transparent',
                    '&::after': location.pathname === child.path
                      ? {
                          content: '""',
                          position: 'absolute',
                          right: -8,
                          top: -1,
                          bottom: -1,
                          width: 16,
                          border: '1px solid',
                          borderColor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main),
                          borderLeft: 'none',
                          borderRadius: '0 999px 999px 0',
                          background: 'transparent',
                        }
                      : undefined,
                    boxShadow: location.pathname === child.path ? '0 6px 16px rgba(16, 24, 40, 0.08)' : 'none',
                  }}
                >
                  <Tooltip title={child.text} placement="right">
                    <ListItemIcon sx={{ color: 'inherit' }}>{child.icon}</ListItemIcon>
                  </Tooltip>
                  {!isCollapsed && <ListItemText primary={child.text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={item.path ?? '#'}
        sx={{
          mx: 1.5,
          my: 0.5,
          borderRadius: 999,
          minHeight: 44,
          bgcolor: isActive ? 'transparent' : 'transparent',
          backgroundImage: isActive
            ? (theme) => `linear-gradient(90deg, ${alpha(theme.palette.success.main, theme.palette.mode === 'dark' ? 0.28 : 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 70%)`
            : 'none',
          color: isActive ? (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark) : 'text.primary',
          '&:hover': {
            bgcolor: 'action.hover',
          },
          position: 'relative',
          border: isActive ? '1px solid' : '1px solid transparent',
          borderColor: isActive ? (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main) : 'transparent',
          '&::after': isActive
            ? {
                content: '""',
                position: 'absolute',
                right: -8,
                top: -1,
                bottom: -1,
                width: 16,
                border: '1px solid',
                borderColor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main),
                borderLeft: 'none',
                borderRadius: '0 999px 999px 0',
                background: 'transparent',
              }
            : undefined,
          boxShadow: isActive ? '0 6px 16px rgba(16, 24, 40, 0.08)' : 'none',
        }}
      >
        <Tooltip title={item.text} placement="right">
          <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
        </Tooltip>
        {!isCollapsed && <ListItemText primary={item.text} />}
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
