import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import TablaTickets from '@/shared/components/tablas/TablaTickets';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import AtencionDialog from '@/shared/components/dialogos/AtencionDialog';
import DerivarDialog from '@/shared/components/dialogos/DerivarDialog';
import type { Id } from '@/domain/models/common';
import type { Sector } from '@/domain/models/sector';

interface TicketRow {
  id: Id;
  ticket: string;
  asociado: string;
  [key: string]: unknown;
}

interface UsuarioItem {
  id: Id;
  nombre: string;
  apellido?: string;
}

interface TicketSeleccionado {
  id: Id;
  codigo: string;
  sector: string;
  cliente?: { titular?: string; dni?: string };
  estado: string;
}

interface InnerAtencionSectorProps {
  tickets: TicketRow[];
  sectores: Sector[];
  errorDialog: string;
  confirmDialogOpen: boolean;
  dialogoAtencionOpen: boolean;
  dialogoDerivarOpen: boolean;
  ticketSeleccionado: TicketSeleccionado | null;
  sectorDestino: Id | null;
  usuarioDestino: Id | null;
  usuariosSector: UsuarioItem[];
  nuevoTicketRef: React.RefObject<HTMLDivElement | null>;
  highlightedId: Id | null;
  onCall: (id: Id) => void;
  onDelete: (id: Id) => void;
  onConfirmDelete: () => void;
  onFinalizar: () => void;
  onDerivar: () => void;
  onConfirmDerivacion: () => void;
  onRellamar: () => void;
  onCloseError: () => void;
  onCancelDelete: () => void;
  onSectorChange: (value: Id | null) => void;
  onUsuarioChange: (value: Id | null) => void;
  onCancelDerivar: () => void;
}

const InnerAtencionSector = ({
  tickets,
  sectores,
  errorDialog,
  confirmDialogOpen,
  dialogoAtencionOpen,
  dialogoDerivarOpen,
  ticketSeleccionado,
  sectorDestino,
  usuarioDestino,
  usuariosSector,
  nuevoTicketRef,
  highlightedId,
  onCall,
  onDelete,
  onConfirmDelete,
  onFinalizar,
  onDerivar,
  onConfirmDerivacion,
  onRellamar,
  onCloseError,
  onCancelDelete,
  onSectorChange,
  onUsuarioChange,
  onCancelDerivar,
}: InnerAtencionSectorProps) => {
  const columns = [
    { label: 'Ticket', key: 'ticket' },
    { label: 'Asociado', key: 'asociado' },
  ];

  return (
    <Container maxWidth="md" ref={nuevoTicketRef} tabIndex={-1}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="h4">Tickets Disponibles</Typography>
            <Typography> Total: ({tickets.length}) </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <TablaTickets columns={columns} rows={tickets} onCall={onCall} onDelete={onDelete} highlightedId={highlightedId ?? undefined} />
        </Box>
      </Box>

      <AtencionDialog
        open={dialogoAtencionOpen}
        ticket={ticketSeleccionado ?? undefined}
        onFinalizar={onFinalizar}
        onDerivar={onDerivar}
        onRellamar={onRellamar}
      />

      <DerivarDialog
        open={dialogoDerivarOpen}
        sectores={sectores}
        usuarios={usuariosSector}
        sectorSeleccionado={sectorDestino}
        usuarioSeleccionado={usuarioDestino}
        onSectorChange={(value) => onSectorChange(value === '' ? null : value)}
        onUsuarioChange={(value) => onUsuarioChange(value === '' ? null : value)}
        onConfirm={onConfirmDerivacion}
        onCancel={onCancelDerivar}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        title="¿Descartar ticket?"
        message="Esta acción marcará el ticket como eliminado."
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />

      <ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={onCloseError} />
    </Container>
  );
};

export default InnerAtencionSector;
