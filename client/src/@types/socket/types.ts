export interface ServerToClientEvents {
  replay: ({ name, message }: { name: string; message: string }) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message }: { name: string; message: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
