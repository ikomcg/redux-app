"use client";
import {
   useAddTodosMutation,
   useFetchTodosQuery,
} from "@/configuration/redux/state/Todos-api";
import React, { useState } from "react";

const LIMIT_API = 5;

const Page = () => {
   const [page, setPage] = useState(1);
   const [addTodos, { isLoading }] = useAddTodosMutation();
   const { data, isFetching, refetch } = useFetchTodosQuery({
      page,
      limit: LIMIT_API,
   });
   const numberPage = data ? data.total / LIMIT_API : 0;
   const pages = Array.from(Array(Math.ceil(numberPage)).keys()).map(
      (i) => i + 1
   );

   const initialProduct = {
      title: "",
      description: "",
   };

   const [post, setPost] = useState(initialProduct);
   const { title, description } = post;

   function OnChangeHandle(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      const { value, name } = e.target;

      setPost((prev) => ({ ...prev, [name]: value }));
   }

   async function OnSubmitForm(e: React.FormEvent) {
      e.preventDefault();

      const canSave = [title, description].every(Boolean);

      if (!canSave) return;

      try {
         await addTodos({ title, description }).unwrap();
         setPost(initialProduct);
      } catch (err) {
         console.error("Failed to save the post: ", err);
      }
   }

   return (
      <div className="flex flex-row p-5 gap-5">
         <form className="flex flex-col w-1/2" onSubmit={OnSubmitForm}>
            <label htmlFor="">Title</label>
            <input
               className="border border-slate-500 rounded p-2 outline-blue-300 mb-2"
               type="text"
               id="postTitle"
               name="title"
               value={title}
               onChange={OnChangeHandle}
            />
            <label htmlFor="postContent">Description:</label>
            <textarea
               className="border border-slate-500 rounded p-2 outline-blue-300"
               id="postContent"
               name="description"
               value={description}
               onChange={OnChangeHandle}
            />
            <button
               type="submit"
               className="bg-green-500 py-2 px-4 rounded text-white w-max ml-auto mt-2"
            >
               Add Product
            </button>
         </form>

         <div className="flex flex-col w-1/2">
            <div className="min-h-[385px]">
               <span>Products : {data?.products.length}</span>
               {isFetching ? (
                  "\nLoading..."
               ) : (
                  <table>
                     <thead>
                        <tr>
                           <th>Title</th>
                           <th>Description</th>
                           <th>Category</th>
                           <th>Brand</th>
                           <th>Price</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.products.map((item) => (
                           <tr key={item.id}>
                              <td>{item.title}</td>
                              <td>{item.description}</td>
                              <td>{item.category}</td>
                              <td>{item.brand}</td>
                              <td>{item.price}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </div>

            <div className="flex flex-row gap-3 mt-10">
               <button
                  className="bg-blue-300 text-white px-2 rounded"
                  onClick={() => {
                     if (page <= 1) return;

                     setPage((prev) => prev - 1);
                  }}
               >
                  {"<"}
               </button>
               <div className="flex flex-row gap-2 overflow-x-auto max-w-50 ">
                  {pages.map((item, i) => (
                     <button
                        key={item + i}
                        className={`text-blue-300 px-2 rounded hover:bg-slate-200 ${
                           item === data?.skip ? "bg-slate-300" : ""
                        }`}
                        onClick={() => setPage(item)}
                     >
                        {item}
                     </button>
                  ))}
               </div>

               <button
                  className="bg-blue-300 text-white px-2 rounded"
                  onClick={() => {
                     if (page >= LIMIT_API) return;
                     setPage((prev) => prev + 1);
                  }}
               >
                  {">"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default Page;
