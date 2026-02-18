import { useCallback, useEffect, useState } from 'react';
import { getTicketsFiltrados } from '@/features/secciones/controllers/seccionesController';
import { getTicketsHubConnection, startTicketsHub } from '@/shared/realtime/ticketsHub';

import type { TicketApiItem } from '@/domain/models/ticket';
import type { Id } from '@/domain/models/common';

// Unificamos el tipo con el que espera InnerAtencionSector
export interface TicketRow {
  id: Id;
  ticket: string;
  asociado: string;
  [key: string]: unknown;
}

// Eliminado: TicketItem

export const useTicketsPorSector = (sectorId: number | string) => {
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [error, setError] = useState<string>('');

  const cargarTickets = useCallback(async () => {
    const token = sessionStorage.getItem('token') ?? '';
    try {
      const data = await getTicketsFiltrados(sectorId, token);
      const formateados: TicketRow[] = (data as TicketApiItem[])
        .map((t) => ({
          id: t.id,
          ticket: `${t.letra}${t.numero}`,
          asociado: `${t.clienteNavigation?.titular ?? '—'}`,
          // Si necesitas ordenar por numero, puedes agregarlo aquí temporalmente
          numero: t.numero,
        }))
        .sort((a, b) => {
          const aNum = Number(a.numero ?? 0);
          const bNum = Number(b.numero ?? 0);
          return aNum - bNum;
        })
        .map(({ numero, ...rest }) => rest); // Elimina 'numero' del resultado final
      setTickets(formateados);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar tickets: ${message}`);
    }
  }, [sectorId]);

  useEffect(() => {
    cargarTickets();
  }, [cargarTickets]);

  useEffect(() => {
    let isActive = true;
    const connection = getTicketsHubConnection();

    const handleTicketCreated = (payload: unknown) => {
      if (!isActive) return;
      const sectorValue = typeof payload === 'object' && payload !== null
        ? (payload as { sectorId?: number | string; sectorIdOrigen?: number | string }).sectorId ??
          (payload as { sectorIdOrigen?: number | string }).sectorIdOrigen
        : null;
      if (sectorValue && String(sectorValue) !== String(sectorId)) return;
      cargarTickets();
    };

    connection.on('ticketCreated', handleTicketCreated);
    startTicketsHub().catch((err) => {
      console.warn('SignalR: no se pudo conectar al hub de tickets.', err);
    });

    return () => {
      isActive = false;
      connection.off('ticketCreated', handleTicketCreated);
    };
  }, [cargarTickets, sectorId]);

  return { tickets, error, refetch: cargarTickets };
};
