import { configureStore } from "@reduxjs/toolkit";
import { counterReducer, postsReducer, todosReducer } from "./state/";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      posts: postsReducer,
      todos: todosReducer,
   },
   devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
