import { User } from '../db/types';

export interface ServerToClientEvents {
  replay: ({ name, message, to, timeStamp }: Message) => void;
  userActivity: (db: User[]) => void;
  userTypingReplay: ({ name, type }: { name: string; type: boolean }) => void;
  updateMessagesHistory: (messages: Message[]) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message, to }: Message) => void;
  userTyping: ({ name, type }: { name: string; type: boolean }) => void;
  disconnect: () => void;
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
