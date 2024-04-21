import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

type TodosType = {
   userId: number;
   id: number;
   title: string;
   completed: boolean;
};

type InitialStateType = {
   todos: TodosType[];
   status: "idle" | "loading" | "succeeded" | "failed";
   error: null | string | undefined;
};

const initialState: InitialStateType = {
   todos: [],
   status: "idle",
   error: null as string | null | undefined,
};

export const FetchTodos = createAsyncThunk("posts/todos", async () => {
   const response = await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
         console.log(error);
         return error;
      });

   return response;
});

const TodosSlice = createSlice({
   name: "todos",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(FetchTodos.pending, (state, action) => {
            state.status = "loading";
         })
         .addCase(FetchTodos.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.todos = state.todos.concat(action.payload);
         })
         .addCase(FetchTodos.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export const todosReducer = TodosSlice.reducer;
