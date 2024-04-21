import { configureStore } from "@reduxjs/toolkit";
import {
   counterReducer,
   postsReducer,
   todosReducer,
   apiTodosSlice,
} from "./state/";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      posts: postsReducer,
      todos: todosReducer,
      [apiTodosSlice.reducerPath]: apiTodosSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiTodosSlice.middleware);
   },
   devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
