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

export const apiTodosSlice = createApi({
   reducerPath: "api-todos",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://dummyjson.com/",
   }),
   endpoints(builder) {
      return {
         fetchTodos: builder.query<{ products: ProductType[], total : number, skip : number }, number | void>({
            query(page = 1) {
               return `products?skip=${page}&limit=10`;
            },
         }),
      };
   },
});

export const { useFetchTodosQuery } = apiTodosSlice;
