export interface User {
  name: string;
  id: string;
  password: string;
  status: 'online' | 'offline';
}
