import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { config } from '@/shared/config/config';

const normalizeBase = (value: string) => value.replace(/\/$/, '');

const resolveHubUrl = () => {
  const envHubUrl = import.meta.env.VITE_HUB_URL as string | undefined;
  if (envHubUrl) return normalizeBase(envHubUrl);
  if (!config.urlBase) return '/hubs/tickets';
  if (/^https?:\/\//i.test(config.urlBase)) {
    return `${normalizeBase(config.urlBase)}/hubs/tickets`;
  }
  return `${normalizeBase(config.urlBase)}/hubs/tickets`;
};

let connection: HubConnection | null = null;

export const getTicketsHubConnection = () => {
  if (connection) return connection;
  connection = new HubConnectionBuilder()
    .withUrl(resolveHubUrl(), {
      accessTokenFactory: () => sessionStorage.getItem('token') ?? '',
      withCredentials: false,
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Warning)
    .build();
  return connection;
};

export const startTicketsHub = async () => {
  const conn = getTicketsHubConnection();
  if (conn.state === HubConnectionState.Disconnected) {
    await conn.start();
  }
  return conn;
};
