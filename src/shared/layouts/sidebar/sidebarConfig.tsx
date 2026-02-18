import React from 'react';
import { getZonaId, getSectorId, getPermisoId } from '@/shared/utils/jwtUtils';
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

export interface SidebarChildItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  isExternal?: boolean;
}

export interface SidebarItemConfig {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: SidebarChildItem[];
}

export const getSidebarItems = (): SidebarItemConfig[] => {
  // Usar funciones utilitarias para obtener los datos del token
  const zonaId = getZonaId();
  const sectorId = getSectorId();
  const permisoId = getPermisoId();

  const esAdmin = Array.isArray(permisoId) ? permisoId.includes(1) : false;

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
        ...(esAdmin
          ? [
              { text: 'Cajas', icon: <DeskIcon />, path: '/secciones/cajas' },
              { text: 'Usuarios', icon: <GroupIcon />, path: '/secciones/usuarios' },
              { text: 'Reclamos', icon: <ReceiptLongIcon />, path: '/secciones/reclamos' },
            ]
          : [
              ...((zonaId === 40 && (sectorId === 7 || sectorId === 13)) ? [{ text: 'Cajas', icon: <DeskIcon />, path: '/secciones/cajas' }] : []),
              ...((zonaId === 40 && sectorId === 4) ? [{ text: 'Reclamos', icon: <ReceiptLongIcon />, path: '/secciones/reclamos' }] : []),
              ...((zonaId === 40 && sectorId === 3) ? [{ text: 'Usuarios', icon: <GroupIcon />, path: '/secciones/usuarios' }] : []),
            ]),
      ],
    },
    ...(esAdmin
      ? [
          { text: 'Estados', icon: <TimelineIcon />, path: `/turnero/estados`},
          { text: 'Mostradores', icon: <DeskIcon />, path: '/mostradores' },
          { text: 'Difusiones', icon: <TvIcon />, path: '/difusiones' },
          { text: 'Roles', icon: <ContentPasteIcon />, path: '/roles' },
          { text: 'Sectores', icon: <LocationOnIcon />, path: '/sectores' },
          { text: 'Usuarios', icon: <GroupIcon />, path: '/usuarios' },
        ]
      : []),
  ];
};
