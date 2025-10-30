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
import { NavLink } from 'react-router-dom';

const SidebarItem = ({
  item,
  isCollapsed,
  location,
  openSecciones,
  openInstitucional,
  setOpenSecciones,
  setOpenInstitucional,
}) => {
  const isActive = location.pathname === item.path;
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
              bgcolor: item.text === 'Secciones' && location.pathname.startsWith('/seccion/')
                ? 'corpico.verde'
                : 'transparent',
              color: item.text === 'Secciones' && location.pathname.startsWith('/seccion/')
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
        to={item.path}
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