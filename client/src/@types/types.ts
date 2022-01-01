import { Message } from '../../../server/@types/socket/types';
import { User } from '../../../server/@types/db/types';

/***** REDUCER *****/
export interface ChatState {
  username: string;
  connectedUsers: User[];
  room: { room: string; name: string };
  chat: Message[];
  typingUser: string;
}
