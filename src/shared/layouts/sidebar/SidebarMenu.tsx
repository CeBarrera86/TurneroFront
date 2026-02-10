import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, List, Typography } from '@mui/material';
import SidebarItem from './SidebarItem';
import { getSidebarItems, type SidebarItemConfig } from './sidebarConfig';

interface SidebarMenuProps {
  isCollapsed: boolean;
}

const SidebarMenu = ({ isCollapsed }: SidebarMenuProps) => {
  const location = useLocation();
  const [openSecciones, setOpenSecciones] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);

  const isSeccionesActive = location.pathname.startsWith('/secciones/');

  useEffect(() => {
    if (isSeccionesActive) setOpenSecciones(true);
  }, [isSeccionesActive]);

  const menuItems: SidebarItemConfig[] = getSidebarItems();
  const mainItems = menuItems.filter((item) => ['Institucional', 'Secciones'].includes(item.text));
  const systemItems = menuItems.filter((item) => !['Institucional', 'Secciones'].includes(item.text));

  return (
    <Box sx={{ minHeight: 0 }}>
      <List>
        {mainItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isCollapsed={isCollapsed}
            location={location}
            openSecciones={openSecciones}
            openInstitucional={openInstitucional}
            setOpenSecciones={setOpenSecciones}
            setOpenInstitucional={setOpenInstitucional}
          />
        ))}
      </List>
      <List>
        {systemItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isCollapsed={isCollapsed}
            location={location}
            openSecciones={openSecciones}
            openInstitucional={openInstitucional}
            setOpenSecciones={setOpenSecciones}
            setOpenInstitucional={setOpenInstitucional}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarMenu;
