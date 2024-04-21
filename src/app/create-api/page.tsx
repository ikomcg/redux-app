"use client";
import { useFetchTodosQuery } from "@/configuration/redux/state/Todos-api";
import { useCallback, useState } from "react";

const Page = () => {
   const [page, setPage] = useState(1);
   const { data, isFetching } = useFetchTodosQuery(page);
   const numberPage = data ? data.total / 10 : 0;
   const pages = Array.from(Array(Math.ceil(numberPage)).keys()).map(
      (i) => i + 1
   );

   return (
      <div className="p-5">
         <span>Products : {data?.products.length}</span>
         {
            <div className="min-h-[385px]">
               {isFetching ? (
                  "\nLoading..."
               ) : (
                  <table>
                     <thead>
                        <tr>
                           <th>User Id</th>
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
         }
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
                  if (page >= 10) return;
                  setPage((prev) => prev + 1);
               }}
            >
               {">"}
            </button>
         </div>
      </div>
   );
};

export default Page;
