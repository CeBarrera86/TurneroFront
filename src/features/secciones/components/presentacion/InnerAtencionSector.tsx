import React, { useMemo, useState } from 'react';
import { Container, useTheme } from '@mui/material';
import ConfirmDialog from '@/shared/components/dialogos/ConfirmDialog';
import ErrorDialog from '@/shared/components/dialogos/ErrorDialog';
import AtencionDialog from '@/shared/components/dialogos/AtencionDialog';
import DerivarDialog from '@/shared/components/dialogos/DerivarDialog';
import SeccionHeader from '@/shared/components/secciones/SeccionHeader';
import TicketBoard from '@/shared/components/secciones/TicketBoard';
import TicketColumn from '@/shared/components/secciones/TicketColumn';
import TicketCard from '@/shared/components/secciones/TicketCard';
import EmptyState from '@/shared/components/secciones/EmptyState';
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
  errorMessage: string;
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
  onCloseErrorMessage: () => void;
  onCancelDelete: () => void;
  onSectorChange: (value: Id | null) => void;
  onUsuarioChange: (value: Id | null) => void;
  onCancelDerivar: () => void;
}

const InnerAtencionSector = ({
  tickets,
  sectores,
  errorDialog,
  errorMessage,
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
  onCloseErrorMessage,
  onCancelDelete,
  onSectorChange,
  onUsuarioChange,
  onCancelDerivar,
}: InnerAtencionSectorProps) => {
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();

  const filteredTickets = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return tickets;
    return tickets.filter((t) =>
      `${t.ticket} ${t.asociado}`.toLowerCase().includes(query)
    );
  }, [tickets, searchValue]);

  const disponibles = filteredTickets.slice(0, 3);
  const derivados: TicketRow[] = [];
  const total = filteredTickets.length + derivados.length;

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ px: { xs: 2, md: 3 } }}
      ref={nuevoTicketRef}
      tabIndex={-1}
    >
      <SeccionHeader
        title="Gestión de tickets"
        total={total}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Buscar ticket..."
      />

      <TicketBoard>
        <TicketColumn
          title="Turno solicitado"
          subtitle="Tickets en espera de atención"
          accentColor={theme.palette.primary.main}
        >
          <EmptyState message="Sin turnos solicitados." />
        </TicketColumn>

        <TicketColumn
          title="Disponibles"
          subtitle="Listos para ser procesados"
          count={filteredTickets.length}
          accentColor={theme.palette.success.main}
        >
          {disponibles.length === 0 ? (
            <EmptyState message="No se encontraron tickets." />
          ) : (
            disponibles.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket.ticket}
                asociado={ticket.asociado}
                highlighted={ticket.id === highlightedId}
                onCall={() => onCall(ticket.id)}
                onDelete={() => onDelete(ticket.id)}
              />
            ))
          )}
        </TicketColumn>

        <TicketColumn
          title="Derivados"
          subtitle="Tickets de otras secciones"
          count={derivados.length}
          accentColor={theme.palette.info.main}
        >
          <EmptyState message="Sin tickets derivados." />
        </TicketColumn>
      </TicketBoard>

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
      <ErrorDialog open={!!errorMessage} mensaje={errorMessage} onClose={onCloseErrorMessage} />
    </Container>
  );
};

export default InnerAtencionSector;
