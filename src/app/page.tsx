"use client";

import {
   useAppSelector,
   useAppDispatch,
} from "@/configuration/redux/services/hooks";
import {
   decrement,
   increment,
} from "@/configuration/redux/state/Counter-Slice";

export default function Home() {
   const count = useAppSelector((state) => state.counter.value);
   const dispatch = useAppDispatch();
   return (
      <main className="grid place-items-center bg-white min-h-[calc(100vh-52px)] text-neutral-900">
         <div className="flex flex-col text-center">
            <h1 className="text-2xl font-bold">Redux Toolkit </h1>
            {count}
            <button
               className="bg-blue-500 rounded text-white hover:outline hover:outline-blue-300 px-3 py-1 my-1"
               onClick={() => dispatch(increment())}
            >
               Increment
            </button>
            <button
               className="bg-red-500 rounded text-white hover:outline hover:outline-red-300 px-3 py-1"
               onClick={() => dispatch(decrement())}
            >
               Decrement
            </button>
         </div>
      </main>
   );
}
