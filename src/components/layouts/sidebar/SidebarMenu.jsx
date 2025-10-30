import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from '@mui/material';
import SidebarItem from './SidebarItem';
import { getSidebarItems } from './sidebarConfig';

const SidebarMenu = ({ isCollapsed }) => {
  const location = useLocation();
  const [openSecciones, setOpenSecciones] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);

  const isSeccionesActive = location.pathname.startsWith('/seccion/');

  useEffect(() => {
    if (isSeccionesActive) setOpenSecciones(true);
  }, [isSeccionesActive]);

  const menuItems = getSidebarItems();

  return (
    <List>
      {menuItems.map((item, index) => (
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
  );
};

export default SidebarMenu;