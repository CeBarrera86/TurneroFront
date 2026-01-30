import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  llamarTicket,
  eliminarTicket,
  getTicketDetalle,
  finalizarAtencion,
  derivarTicket,
  rellamarTicket,
  getSectores,
  getUsuariosPorSector,
} from '@/features/secciones/controllers/seccionesController';
import { useTicketsPorSector } from '@/features/secciones/hooks/useTicketsPorSector';
import InnerAtencionSector from './InnerAtencionSector';
import type { Id } from '@/domain/models/common';
import type { TicketDetalle } from '@/domain/models/ticket';
import type { Sector } from '@/domain/models/sector';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

interface TicketSeleccionado {
  id: Id;
  codigo: string;
  sector: string;
  cliente?: { titular?: string; dni?: string };
  estado: string;
}

interface UsuarioItem {
  id: Id;
  nombre: string;
  apellido?: string;
}

interface AtencionSectorProps {
  sectorId: Id;
}

const AtencionSector = ({ sectorId }: AtencionSectorProps) => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const { tickets, error, refetch } = useTicketsPorSector(sectorId);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [ticketAEliminar, setTicketAEliminar] = useState<Id | null>(null);
  const [dialogoAtencionOpen, setDialogoAtencionOpen] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<TicketSeleccionado | null>(null);
  const [dialogoDerivarOpen, setDialogoDerivarOpen] = useState(false);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [usuariosSector, setUsuariosSector] = useState<UsuarioItem[]>([]);
  const [sectorDestino, setSectorDestino] = useState<Id | null>(null);
  const [usuarioDestino, setUsuarioDestino] = useState<Id | null>(null);
  const [highlightedId, setHighlightedId] = useState<Id | null>(null);
  const nuevoTicketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitulo('Atención al Público');
    const token = sessionStorage.getItem('token') ?? '';
    getSectores(token)
      .then((data) => setSectores(data))
      .catch((err) => console.warn('Error al cargar sectores:', err));
  }, [setTitulo]);

  const handleAtender = async (id: Id) => {
    const token = sessionStorage.getItem('token') ?? '';
    try {
      const detalle: TicketDetalle = await getTicketDetalle(id, token);
      setTicketSeleccionado({
        id: detalle.id,
        codigo: `${detalle.letra ?? ''}${detalle.numero ?? ''}`,
        sector: detalle.sector?.nombre ?? '—',
        cliente: detalle.cliente,
        estado: detalle.estado?.descripcion ?? '—',
      });
      setDialogoAtencionOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCall = async (id: Id) => {
    const token = sessionStorage.getItem('token') ?? '';
    try {
      await llamarTicket(id, token);
      setHighlightedId(id);
      setTimeout(() => setHighlightedId(null), 3000);
      await handleAtender(id);
    } catch (err) {
      console.error(`Error al llamar ticket ${id}:`, err);
    }
  };

  const handleFinalizar = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!ticketSeleccionado) return;
    try {
      await finalizarAtencion(ticketSeleccionado.id, token);
      cerrarDialogoAtencion();
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDerivar = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    try {
      if (!sectorDestino) return;
      const usuarios = await getUsuariosPorSector(sectorDestino, token);
      setUsuariosSector(usuarios as UsuarioItem[]);
      setDialogoDerivarOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmarDerivacion = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!ticketSeleccionado || !sectorDestino) return;
    try {
      await derivarTicket(ticketSeleccionado.id, sectorDestino, token, usuarioDestino);
      cerrarDialogoDerivar();
      cerrarDialogoAtencion();
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRellamar = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!ticketSeleccionado) return;
    try {
      await rellamarTicket(ticketSeleccionado.id, token);
      cerrarDialogoAtencion();
    } catch (err) {
      console.error(err);
    }
  };

  const cerrarDialogoAtencion = () => {
    setDialogoAtencionOpen(false);
    setTicketSeleccionado(null);
  };

  const cerrarDialogoDerivar = () => {
    setDialogoDerivarOpen(false);
    setSectorDestino(null);
    setUsuarioDestino(null);
  };

  const handleDeleteClick = (id: Id) => {
    setTicketAEliminar(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = sessionStorage.getItem('token') ?? '';
    if (!ticketAEliminar) return;
    try {
      await eliminarTicket(ticketAEliminar, token);
      await refetch();
    } catch (err) {
      console.error(`Error al eliminar ticket ${ticketAEliminar}:`, err);
    } finally {
      setConfirmDialogOpen(false);
      setTicketAEliminar(null);
    }
  };

  return (
    <InnerAtencionSector
      tickets={tickets}
      sectores={sectores}
      errorDialog={error}
      confirmDialogOpen={confirmDialogOpen}
      dialogoAtencionOpen={dialogoAtencionOpen}
      dialogoDerivarOpen={dialogoDerivarOpen}
      ticketSeleccionado={ticketSeleccionado}
      sectorDestino={sectorDestino}
      usuarioDestino={usuarioDestino}
      usuariosSector={usuariosSector}
      nuevoTicketRef={nuevoTicketRef}
      highlightedId={highlightedId}
      onCall={handleCall}
      onDelete={handleDeleteClick}
      onConfirmDelete={handleConfirmDelete}
      onFinalizar={handleFinalizar}
      onDerivar={handleDerivar}
      onConfirmDerivacion={confirmarDerivacion}
      onRellamar={handleRellamar}
      onCloseError={() => undefined}
      onCancelDelete={() => {
        setConfirmDialogOpen(false);
        setTimeout(() => {
          nuevoTicketRef.current?.focus();
        }, 0);
      }}
      onSectorChange={setSectorDestino}
      onUsuarioChange={setUsuarioDestino}
      onCancelDerivar={cerrarDialogoDerivar}
    />
  );
};

export default AtencionSector;
