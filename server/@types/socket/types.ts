import { User } from '../db/types';
import { Socket } from 'socket.io';

export interface ServerToClientEvents {
  replay: ({ name, message, to, timeStamp }: Message) => void;
  userActivity: (db: User[]) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message, to }: Message) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface Message {
  name: string;
  message: string;
  to?: string;
  timeStamp?: string;
}

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
>;
