import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ChatState } from '../@types/types';
// Types
import { User } from '../@types/db/types';
import { Message } from '../@types/socket/types';

export const initialState: ChatState = {
  username: '',
  connectedUsers: [],
  room: 'Group',
  chat: [],
  currentChat: [],
  typingUser: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    userLogin: (state, { payload }: PayloadAction<{ username: string }>) => {
      return { ...state, username: payload.username };
    },

    updateUsers: (state, { payload }: PayloadAction<{ users: User[] }>) => {
      return { ...state, connectedUsers: payload.users };
    },

    getMessage: (state, { payload }: PayloadAction<{ message: Message }>) => {
      if (payload.message.to === state.room) {
        // Message to the current user in the current room
        return {
          ...state,
          chat: [...state.chat, payload.message],
          currentChat: [...state.currentChat, payload.message],
        };
      } else {
        // Message to the current user in another room
        return { ...state, chat: [...state.chat, payload.message] };
      }
    },

    setMessageDestination: (state, { payload }: PayloadAction<{ name: string }>) => {
      // If the room is already set, set to the empty string meaning general chat room
      const nameToChange = state.room === 'Group' ? payload.name : 'Group';

      return { ...state, room: nameToChange };
    },

    setTypingUser: (state, { payload }: PayloadAction<{ name: string; type: boolean }>) => {
      if (payload.type) {
        return { ...state, typingUser: payload.name };
      } else {
        return { ...state, typingUser: '' };
      }
    },

    showConversation: state => {
      // Filter messages to show only the conversation with the selected user
      const chatCopy = [...current(state).chat];

      let filteredChat: Message[] = [];
      // Group chat
      if (current(state).room === 'Group') {
        filteredChat = chatCopy.filter(message => message.to === 'Group');
      } else {
        // Private messages
        filteredChat = chatCopy.filter(
          message =>
            (message.to === state.room && message.name === state.username) ||
            (message.name === state.room && message.to === state.username)
        );
      }
      return { ...state, currentChat: filteredChat };
    },
  },
});

export const {
  userLogin,
  updateUsers,
  getMessage,
  setMessageDestination,
  setTypingUser,
  showConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
