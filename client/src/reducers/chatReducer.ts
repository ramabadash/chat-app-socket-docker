import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ChatState } from '../@types/types';
// Types
import { User } from '../@types/db/types';
import { Message } from '../@types/socket/types';
// initialState
export const initialState: ChatState = {
  username: '',
  connectedUsers: [],
  room: 'Group',
  chat: [],
  currentChat: [],
  typingUser: '',
  unreadMessages: {},
  groupChats: [{ name: 'Group', id: 'Group' }],
};

// Slice
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

    updateMessagesHistory: (state, { payload }: PayloadAction<{ messages: Message[] }>) => {
      return { ...state, chat: payload.messages };
    },

    getMessage: (state, { payload }: PayloadAction<{ message: Message }>) => {
      const messageContent = payload.message.message;
      const sender = payload.message.name;
      const receiver = payload.message.to;
      const currentRoom = current(state).room;

      // Handle unread messages
      let newUnreadMessages = { ...current(state).unreadMessages }; // Clone unreadMessages
      const messageFromTheGroup =
        receiver === 'Group' && currentRoom !== 'Group' && sender !== state.username;
      const messageFromAnotherRoomNotUserActivity =
        sender !== currentRoom &&
        sender !== state.username &&
        receiver !== 'Group' &&
        messageContent !== 'Enter to the chat' &&
        messageContent !== 'disconnected';

      if (messageFromAnotherRoomNotUserActivity || messageFromTheGroup) {
        let userToAddNotification = sender;

        if (receiver === 'Group') {
          userToAddNotification = 'Group';
        }
        // Message is not for current room
        if (newUnreadMessages.hasOwnProperty(userToAddNotification)) {
          newUnreadMessages[userToAddNotification] += 1; // Already have unread messages
        } else {
          newUnreadMessages[userToAddNotification] = 1; // New unread message
        }
      }

      // Handle chat
      if (receiver === currentRoom || (sender === currentRoom && receiver === state.username)) {
        // Message to the current user in the current room
        return {
          ...state,
          chat: [...state.chat, payload.message],
          currentChat: [...state.currentChat, payload.message],
          unreadMessages: newUnreadMessages,
        };
      } else {
        // Message to the current user in another room
        return {
          ...state,
          chat: [...state.chat, payload.message],
          unreadMessages: newUnreadMessages,
        };
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

    clearUnreadMessagesByName: (state, { payload }: PayloadAction<{ name: string }>) => {
      return { ...state, unreadMessages: { ...state.unreadMessages, [payload.name]: 0 } };
    },
  },
});

export const {
  userLogin,
  updateUsers,
  updateMessagesHistory,
  getMessage,
  setMessageDestination,
  setTypingUser,
  showConversation,
  clearUnreadMessagesByName,
} = chatSlice.actions;

export default chatSlice.reducer;
