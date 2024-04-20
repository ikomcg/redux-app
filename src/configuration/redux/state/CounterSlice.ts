import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
   value: number;
};
const initialState: CounterState = {
   value: 10,
};

const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      increment: (state) => {
         state.value++;
      },
      decrement: (state) => {
         state.value--;
      },
   },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
