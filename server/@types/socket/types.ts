import { User } from '../db/types';

export interface ServerToClientEvents {
  replay: ({ name, message, to }: Message) => void;
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
}
