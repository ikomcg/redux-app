import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
   value: number;
};
const initialState: CounterState = {
   value: 1,
};

const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      increment: (state) => {
         state.value++;
      },
      decrement: (state) => {
         if (state.value <= 0) {
            state.value;
         } else {
            state.value--;
         }
      },
   },
});

export const { increment, decrement } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
