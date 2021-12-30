import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../@types/types';
// Types
import { User } from '../../../server/@types/db/types';

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
  },
});

export const { updateUsers } = chatSlice.actions;

export default chatSlice.reducer;
