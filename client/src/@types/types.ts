import { Message } from '../@types/socket/types';
import { User } from '../@types/db/types';

/***** REDUCER *****/
export interface ChatState {
  username: string;
  connectedUsers: User[];
  room: string;
  chat: Message[];
  currentChat: Message[];
  typingUser: string;
  unreadMessages: UserUnreadMessages;
  groupChats: GroupChat[];
}

type GroupChat = { name: string; id: string };
type UserUnreadMessages = { [username: string]: number };
