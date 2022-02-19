import { Message } from '../@types/socket/types';
import { User } from '../@types/db/types';

/***** REDUCER *****/
export interface ChatState {
  username: string;
  connectedUsers: User[];
  room: { room: string; name: string };
  chat: Message[];
  currentChat: Message[];
  typingUser: string;
}
