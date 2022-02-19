import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ChatState } from '../@types/types';
// Types
import { User } from '../@types/db/types';
import { Message } from '../@types/socket/types';

export const initialState: ChatState = {
  username: '',
  connectedUsers: [],
  room: { room: '', name: '' },
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
      if (payload.message.to === state.room.name) {
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

    setMessageDestination: (state, { payload }: PayloadAction<{ room: string; name: string }>) => {
      const roomToChange = state.room
        ? state.room.room === payload.room
          ? ''
          : payload.room
        : payload.room;
      const nameToChange = roomToChange ? payload.name : '';

      return { ...state, room: { room: roomToChange, name: nameToChange } };
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
      if (current(state).room.name === '') {
        filteredChat = chatCopy.filter(message => message.to === '');
      } else {
        // Private messages
        filteredChat = chatCopy.filter(
          message =>
            (message.to === state.room.name && message.name === state.username) ||
            (message.name === state.room.name && message.to === state.username)
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
