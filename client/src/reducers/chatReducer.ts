import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../@types/types';
// Types
import { User } from '../../../server/@types/db/types';
import { Message } from '../../../server/@types/socket/types';

export const initialState: ChatState = {
  username: '',
  connectedUsers: [],
  room: { room: '', name: '' },
  chat: [],
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
      return { ...state, chat: [...state.chat, payload.message] };
    },

    setMessageDestination: (
      state,
      { payload }: PayloadAction<{ room: string; name: string }>
    ) => {
      const roomToChange = state.room
        ? state.room.room === payload.room
          ? ''
          : payload.room
        : payload.room;
      const nameToChange = roomToChange ? payload.name : '';

      return { ...state, room: { room: roomToChange, name: nameToChange } };
    },

    setTypingUser: (
      state,
      { payload }: PayloadAction<{ name: string; type: boolean }>
    ) => {
      if (payload.type) {
        return { ...state, typingUser: payload.name };
      } else {
        return { ...state, typingUser: '' };
      }
    },
  },
});

export const {
  userLogin,
  updateUsers,
  getMessage,
  setMessageDestination,
  setTypingUser,
} = chatSlice.actions;

export default chatSlice.reducer;
