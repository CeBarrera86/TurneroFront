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
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TablaDifusiones = ({
  archivos,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
  onToggleActivo,
  onDelete
}) => {
  const renderMiniatura = (archivo) => {
    const ext = archivo.nombre.split('.').pop().toLowerCase();
    const base = '/contenido/miniatura/';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      return <img src={`${base}${archivo.nombre}`} alt={archivo.nombre} style={{ width: 80 }} />;
    } else if (['mp4', 'webm', 'ogg', 'avi'].includes(ext)) {
      return <img src={`${base}${archivo.nombre.replace(/\.[^/.]+$/, '.jpg')}`} alt={archivo.nombre} style={{ width: 80 }} />;
    }
    return null;
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
          {Array.isArray(archivos) && archivos.map((archivo) => (
            <TableRow key={archivo.nombre}>
              <TableCell align="center">{renderMiniatura(archivo)}</TableCell>
              <TableCell align="center">{archivo.nombre}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={archivo.activa}
                  onChange={() => onToggleActivo(archivo.nombre)}
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => onDelete(archivo.nombre)} color="error">
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

export default TablaDifusiones;
