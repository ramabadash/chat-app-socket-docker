import { User } from '../db/types';

export interface ServerToClientEvents {
  replay: ({ name, message }: Message) => void;
  userActivity: (db: User[]) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message }: Message) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

interface Message {
  name: string;
  message: string;
}
