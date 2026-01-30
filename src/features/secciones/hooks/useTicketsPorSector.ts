import { useCallback, useEffect, useState } from 'react';
import { getTicketsFiltrados } from '@/features/secciones/controllers/seccionesController';
import type { TicketApiItem } from '@/domain/models/ticket';

interface TicketItem {
  id: number | string;
  ticket: string;
  asociado: string;
}

export const useTicketsPorSector = (sectorId: number | string) => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [error, setError] = useState<string>('');

  const cargarTickets = useCallback(async () => {
    const token = sessionStorage.getItem('token') ?? '';
    try {
      const data = await getTicketsFiltrados(sectorId, token);
      const formateados: TicketItem[] = (data as TicketApiItem[]).map((t) => ({
        id: t.id,
        ticket: `${t.letra}${t.numero}`,
        asociado: `${t.clienteNavigation?.titular ?? '—'}`,
      }));
      setTickets(formateados);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar tickets: ${message}`);
    }
  }, [sectorId]);

  useEffect(() => {
    cargarTickets();
  }, [cargarTickets]);

  return { tickets, error, refetch: cargarTickets };
};
