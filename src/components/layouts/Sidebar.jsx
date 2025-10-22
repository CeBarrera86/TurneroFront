import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  styled,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Apps as AppsIcon,
  ExpandLess,
  ExpandMore,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Instagram as InstagramIcon,
  ReceiptLong as ReceiptLongIcon,
  Domain as DomainIcon,
  Tv as TvIcon,
  ContentPaste as ContentPasteIcon,
  LocationOn as LocationOnIcon,
  Desk as DeskIcon,
  Timeline as TimelineIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import Logo from '../../assets/img/corpico_logo.svg';
import Logo2 from '../../assets/img/corpico_logo2.svg';

const sidebarWidth = 230;
const collapsedWidth = 70;

const StyledDrawer = styled(Drawer)(({ theme, iscollapsed }) => ({
  width: iscollapsed === 'true' ? collapsedWidth : sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: iscollapsed === 'true' ? collapsedWidth : sidebarWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.layout,
    color: theme.palette.text.primary,
    borderRadius: '12px',
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(0, 0, 0, .4)',
    position: 'fixed',
    transition: 'width 0.3s ease',
    overflowX: 'hidden', // ✅ evita scroll horizontal
  },
}));

const Sidebar = () => {
  const location = useLocation();
  const [openSecciones, setOpenSecciones] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      text: 'Institucional',
      icon: <DomainIcon />,
      path: '',
      children: [
        { text: 'Internos', icon: <PhoneIcon />, path: 'http://ciatinfo.com.ar/internos/', isExternal: true },
        { text: 'Corpico', icon: <BusinessIcon />, path: 'https://corpico.com.ar/', isExternal: true },
        { text: 'Humand', icon: <GroupIcon />, path: 'https://app.humand.co/', isExternal: true },
        { text: 'Personal', icon: <ReceiptLongIcon />, path: 'https://sugad.corpico.com.ar/init/sso/sign-in', isExternal: true },
        { text: 'Instagram', icon: <InstagramIcon />, path: 'https://www.instagram.com/corpico_coop/', isExternal: true },
      ],
    },
    {
      text: 'Secciones',
      icon: <AppsIcon />,
      path: '',
      children: [
        { text: 'Cajas', icon: <DeskIcon />, path: '/cajas' },
        { text: 'Usuarios', icon: <GroupIcon />, path: '/usuarios' },
        { text: 'Reclamos', icon: <ReceiptLongIcon />, path: '/reclamos' },
      ],
    },
    { text: 'Estados', icon: <TimelineIcon />, path: '/estados' },
    { text: 'Mostradores', icon: <DeskIcon />, path: '/mostradores' },
    { text: 'Publicidades', icon: <TvIcon />, path: '/publicidades' },
    { text: 'Roles', icon: <ContentPasteIcon />, path: '/roles' },
    { text: 'Sectores', icon: <LocationOnIcon />, path: '/sectores' },
  ];

  const isSeccionesActive = ['/cajas', '/usuarios', '/reclamos'].includes(location.pathname);
  const isInstitucionalActive = ['/institucional/internos', '/institucional/corpico', '/institucional/humand', '/institucional/personal', '/institucional/instagram'].includes(location.pathname);

  useEffect(() => {
    if (isSeccionesActive) setOpenSecciones(true);
  }, [isSeccionesActive]);

  const handleSeccionesClick = () => setOpenSecciones(!openSecciones);
  const handleInstitucionalClick = () => setOpenInstitucional(!openInstitucional);

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

      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)', mx: 2 }} />
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.children ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={item.text === 'Secciones' ? handleSeccionesClick : handleInstitucionalClick}
                    sx={{
                      bgcolor: (item.text === 'Secciones' && isSeccionesActive) || (item.text === 'Institucional' && isInstitucionalActive) ? 'corpico.verde' : 'transparent',
                      color: (item.text === 'Secciones' && isSeccionesActive) || (item.text === 'Institucional' && isInstitucionalActive) ? 'white' : 'text.primary',
                      '&:hover': {
                        bgcolor: 'corpico.verde',
                        color: 'white',
                      }
                    }}
                  >
                    <Tooltip title={isCollapsed ? item.text : ''} placement="right">
                      <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                    </Tooltip>
                    {!isCollapsed && <ListItemText primary={item.text} />}
                    {!isCollapsed && ((item.text === 'Secciones' && openSecciones) || (item.text === 'Institucional' && openInstitucional) ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
                <Collapse in={!isCollapsed && ((item.text === 'Secciones' && openSecciones) || (item.text === 'Institucional' && openInstitucional))} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItem key={childIndex} disablePadding>
                        {child.isExternal ? (
                          <ListItemButton component="a" href={child.path} target="_blank" rel="noopener noreferrer" sx={{ pl: 4 }}>
                            <Tooltip title={isCollapsed ? child.text : ''} placement="right">
                              <ListItemIcon sx={{ color: 'inherit' }}>{child.icon}</ListItemIcon>
                            </Tooltip>
                            {!isCollapsed && <ListItemText primary={child.text} />}
                          </ListItemButton>
                        ) : (
                          <ListItemButton component={NavLink} to={child.path} sx={{ pl: 4 }}>
                            <Tooltip title={isCollapsed ? child.text : ''} placement="right">
                              <ListItemIcon sx={{ color: 'inherit' }}>{child.icon}</ListItemIcon>
                            </Tooltip>
                            {!isCollapsed && <ListItemText primary={child.text} />}
                          </ListItemButton>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to={item.path}>
                  <Tooltip title={isCollapsed ? item.text : ''} placement="right">
                    <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                  </Tooltip>
                  {!isCollapsed && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;