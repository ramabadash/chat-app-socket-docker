import { configureStore } from '@reduxjs/toolkit';
import chatSlice from '../reducers/chatReducer';

export const store = configureStore({
  reducer: {
    chatReducer: chatSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
