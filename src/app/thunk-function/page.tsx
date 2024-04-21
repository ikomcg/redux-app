"use client";

import {
   useAppDispatch,
   useAppSelector,
} from "@/configuration/redux/services/hooks";
import { increment } from "@/configuration/redux/state/Counter-Slice";
import { FetchTodos } from "@/configuration/redux/state/Fetch-api";
import { RootState } from "@/configuration/redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Page = () => {
   const dispatch = useAppDispatch();
   const todos = useAppSelector((state) => state.todos);

   const exampleThunkFunction = (
      dispatch: Dispatch,
      getState: () => RootState
   ) => {
      const stateBefore = getState();
      console.log(`Counter before: ${stateBefore.counter.value}`);
      dispatch(increment());
      const stateAfter = getState();
      console.log(`Counter after: ${stateAfter.counter.value}`);
   };

   const todosSice = useAppSelector((state) => state.todos.status);

   useEffect(() => {
      if (todosSice === "idle") {
         dispatch(FetchTodos());
      }
   }, [todosSice, dispatch]);

   console.log(todos);

   return (
      <div className="grid place-items-center mt-3">
         <button
            className="bg-blue-500 outline-blue-300 px-3 py-1 text-white rounded"
            onClick={() => dispatch(exampleThunkFunction)}
         >
            Thunck Function
         </button>

         <div>
            {todos.status === "loading" ? (
               <span>Loading...</span>
            ) : (
               <div className="flex flex-col gap-2 mt-3">
                  {todos.todos.map((item) => (
                     <div key={item.id} className="border border-slate-500 p-5">
                        <p>{item.title}</p>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default Page;
