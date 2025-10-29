import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  TableSortLabel,
  TablePagination
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const TablaListado = ({ columns, rows, onEdit, onDelete, maxWidth }) => {
  // Ordenamiento por defecto por ID
  const defaultOrderBy = columns.find(c => ['id', 'ID', 'Id'].includes(c.key))?.key || '';
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [order, setOrder] = useState('asc');
  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleSort = (key) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };
  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const sortedRows = [...rows].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === 'number' && typeof bValue === 'number') { return order === 'asc' ? aValue - bValue : bValue - aValue; }

    return order === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ overflowX: 'auto', maxWidth: maxWidth || '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ label, key }) => (
              <TableCell key={key} align="center">
                <TableSortLabel active={orderBy === key} direction={orderBy === key ? order : 'asc'} onClick={() => handleSort(key)} >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <TableRow key={row.id}>
              {columns.map(({ key }) => (<TableCell key={key} align="center"> {row[key] ?? '—'} </TableCell>))}
              <TableCell align="center">
                <IconButton onClick={() => onEdit(row.id)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
};

export default TablaListado;