import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
   { id: "1", title: "First Post!", content: "Hello!", reaction: [] },
   { id: "2", title: "Second Post", content: "More text", reaction: [] },
];

const postsSlice = createSlice({
   name: "posts",
   initialState,

   reducers: {
      postAdded: {
         reducer(state, action) {
            state.push(action.payload);
         },
         prepare(args) {
            return {
               payload: {
                  id: nanoid(),
                  ...args,
               },
            };
         },
      },

      reactionAdd(state, action) {
         const { id, ...data } = action.payload;
         const post = state.find((item) => item.id === id);

         console.log(data);

         if (post) {
            post.reaction.push({ ...data });
         }
      },

      removePost(state, action) {
         return state.filter((item) => item.id !== action.payload.id);
      },
   },
});

export const { postAdded, removePost, reactionAdd } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
