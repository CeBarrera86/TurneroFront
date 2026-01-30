import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  TablePagination,
  Tooltip,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { config } from '@/shared/config/config';
import type { Id } from '@/domain/models/common';

interface ContenidoFila {
  id: Id;
  nombre: string;
  urlMiniatura: string;
  tipo?: string;
  activa: boolean;
}

interface TablaContenidosProps {
  archivos: ContenidoFila[];
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleActivo: (id: Id) => void;
  onDelete: (id: Id) => void;
}

const TablaContenidos = ({
  archivos,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
  onToggleActivo,
  onDelete,
}: TablaContenidosProps) => {
  const renderMiniatura = (archivo: ContenidoFila) => {
    const fullUrl = `${config.urlBase}${archivo.urlMiniatura}`;
    const altText = archivo.tipo === 'video'
      ? `${archivo.nombre.replace(/\.[^/.]+$/, '')}.jpg`
      : archivo.nombre;
    return (
      <Box
        component="img"
        src={fullUrl}
        alt={altText}
        sx={{ width: 80 }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.onerror = null;
          target.src = '/assets/img/fallback.png';
        }}
      />
    );
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Miniatura</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Activa</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(archivos) &&
            archivos.map((archivo) => (
              <TableRow key={archivo.id}>
                <TableCell align="center">{renderMiniatura(archivo)}</TableCell>
                <TableCell align="center">{archivo.nombre}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={archivo.activa}
                    onChange={() => onToggleActivo(archivo.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => onDelete(archivo.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default TablaContenidos;
