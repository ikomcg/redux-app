import { configureStore } from "@reduxjs/toolkit";
import { counterReducer, postsReducer } from "./state/";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      posts: postsReducer,
   },
   devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
