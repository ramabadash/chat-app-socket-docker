import { Message } from '../../../server/@types/socket/types';
import { User } from '../../../server/@types/db/types';

/***** REDUCER *****/
export interface ChatState {
  username: string;
  connectedUsers: User[];
  room: string;
  chat: Message[];
}
