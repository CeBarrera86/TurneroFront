import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const TablaListado = ({ columns, rows, onEdit, onDelete, maxWidth }) => {
  return (
    <Box sx={{ overflowX: 'auto', maxWidth: maxWidth || '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} align="center">
                {col}
              </TableCell>
            ))}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col} align="center">
                  {row[col.toLowerCase()]}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton onClick={() => onEdit(row.id)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TablaListado;