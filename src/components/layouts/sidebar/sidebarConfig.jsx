import {
  Apps as AppsIcon,
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
} from '@mui/icons-material';

export const getSidebarItems = () => {
  const rol = sessionStorage.getItem('rol');
  const mostradorSector = parseInt(sessionStorage.getItem('mostradorSector'), 10);

  return [
    {
      text: 'Institucional',
      icon: <DomainIcon />,
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
      children: [
        ...(rol === 'Admin'
          ? [
              { text: 'Cajas', icon: <DeskIcon />, path: '/seccion/cajas' },
              { text: 'Usuarios', icon: <GroupIcon />, path: '/seccion/usuarios' },
              { text: 'Reclamos', icon: <ReceiptLongIcon />, path: '/seccion/reclamos' },
            ]
          : rol === 'Usuario'
          ? [
              ...(mostradorSector === 1 ? [{ text: 'Cajas', icon: <DeskIcon />, path: '/seccion/cajas' }] : []),
              ...(mostradorSector === 3 ? [{ text: 'Usuarios', icon: <GroupIcon />, path: '/seccion/usuarios' }] : []),
              ...(mostradorSector === 4 ? [{ text: 'Reclamos', icon: <ReceiptLongIcon />, path: '/seccion/reclamos' }] : []),
            ]
          : []),
      ],
    },
    ...(rol === 'Admin'
      ? [
          { text: 'Estados', icon: <TimelineIcon />, path: '/estados' },
          { text: 'Mostradores', icon: <DeskIcon />, path: '/mostradores' },
          { text: 'Difusiones', icon: <TvIcon />, path: '/difusiones' },
          { text: 'Roles', icon: <ContentPasteIcon />, path: '/roles' },
          { text: 'Sectores', icon: <LocationOnIcon />, path: '/sectores' },
          { text: 'Usuarios', icon: <GroupIcon />, path: '/usuarios' },
        ]
      : rol === 'Jefe'
      ? [{ text: 'difusiones', icon: <TvIcon />, path: '/difusiones' }]
      : []),
  ];
};