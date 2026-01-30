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
  const toggleGroup = () =>
    item.text === 'Secciones'
      ? setOpenSecciones(!openSecciones)
      : setOpenInstitucional(!openInstitucional);

  if (item.children) {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton
            onClick={toggleGroup}
            sx={{
              bgcolor: item.text === 'Secciones' && location.pathname.startsWith('/secciones/')
                ? 'corpico.verde'
                : 'transparent',
              color: item.text === 'Secciones' && location.pathname.startsWith('/secciones/')
                ? 'white'
                : 'text.primary',
              '&:hover': {
                bgcolor: 'corpico.verde',
                color: 'white',
              },
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
                    bgcolor: location.pathname === child.path ? 'corpico.verde' : 'transparent',
                    color: location.pathname === child.path ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: 'corpico.verde',
                      color: 'white',
                    },
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
          bgcolor: isActive ? 'corpico.verde' : 'transparent',
          color: isActive ? 'white' : 'text.primary',
          '&:hover': {
            bgcolor: 'corpico.verde',
            color: 'white',
          },
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
