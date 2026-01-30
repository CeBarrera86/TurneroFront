import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { Notifications as BellIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Id } from '@/domain/models/common';

export interface TablaTicketColumn {
  label: string;
  key: string;
}

export interface TablaTicketRow {
  id: Id;
  [key: string]: unknown;
}

interface TablaTicketsProps {
  columns: TablaTicketColumn[];
  rows: TablaTicketRow[];
  onCall: (id: Id) => void;
  onDelete: (id: Id) => void;
  highlightedId?: Id;
  maxWidth?: number | string;
}

const TablaTickets = ({ columns, rows, onCall, onDelete, highlightedId, maxWidth }: TablaTicketsProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ overflowX: 'auto', maxWidth: maxWidth || '100%' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(({ label, key }) => (
              <TableCell key={key} align="center">
                {label}
              </TableCell>
            ))}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor:
                  row.id === highlightedId ? '#e0f7fa' : index % 2 === 0 ? '#f9f9f9' : 'inherit',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              {columns.map(({ key }) => {
                const value = row[key];
                const display = value === null || value === undefined ? '—' :
                  typeof value === 'string' || typeof value === 'number' ? value : String(value);
                return (
                  <TableCell key={key} align="center" sx={{ verticalAlign: 'middle' }}>
                    {display}
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Tooltip title="Llamar ticket">
                  <IconButton aria-label="Llamar ticket" onClick={() => onCall(row.id)}>
                    <BellIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar ticket">
                  <IconButton aria-label="Eliminar ticket" onClick={() => onDelete(row.id)}>
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
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />
    </Box>
  );
};

export default TablaTickets;
