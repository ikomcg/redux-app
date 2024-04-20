import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./state/CounterSlice";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
   },
   devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
