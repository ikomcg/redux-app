import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ProductType = {
   id: number;
   title: string;
   description: string;
   price: number;
   discountPercentage: number;
   rating: number;
   stock: number;
   brand: string;
   category: string;
   thumbnail: string;
   images: string[];
};

type FetchTodos = { products: ProductType[]; total: number; skip: number };

export const apiTodosSlice = createApi({
   reducerPath: "api-todos",
   tagTypes: ["Posts"],
   baseQuery: fetchBaseQuery({
      baseUrl: "https://dummyjson.com/",
   }),
   endpoints: (builder) => ({
      fetchTodos: builder.query<FetchTodos, { [key: string]: string | number }>(
         {
            query({ page, limit }) {
               return `products?skip=${page}&limit=${limit}`;
            },
            providesTags: ["Posts"],
         }
      ),
      addTodos: builder.mutation({
         query: (initialPosts) => ({
            url: "products/add",
            method: "POST",
            body: initialPosts,
         }),
         invalidatesTags: ["Posts"],
      }),
   }),
});

export const { useFetchTodosQuery, useAddTodosMutation } = apiTodosSlice;
