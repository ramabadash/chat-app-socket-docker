import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../@types/types';
// Types
import { User } from '../../../server/@types/db/types';
import { Message } from '../../../server/@types/socket/types';

export const initialState: ChatState = {
  username: '',
  connectedUsers: [],
  room: '',
  chat: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateUsers: (state, { payload }: PayloadAction<{ users: User[] }>) => {
      return { ...state, connectedUsers: payload.users };
    },
    getMessage: (state, { payload }: PayloadAction<{ message: Message }>) => {
      return { ...state, chat: [...state.chat, payload.message] };
    },
  },
});

export const { updateUsers, getMessage } = chatSlice.actions;

export default chatSlice.reducer;
