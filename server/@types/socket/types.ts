interface ServerToClientEvents {
  replay: ({ name, message }: { name: string; message: string }) => void;
}

interface ClientToServerEvents {
  message: ({ name, message }: { name: string; message: string }) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
