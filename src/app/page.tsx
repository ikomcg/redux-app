"use client";

import {
   useAppSelector,
   useAppDispatch,
} from "@/configuration/redux/services/hooks";
import { increment } from "@/configuration/redux/state/CounterSlice";

export default function Home() {
   const count = useAppSelector((state) => state.counter.value);
   const dispatch = useAppDispatch();
   return (
      <main className="flex bg-white min-h-screen text-neutral-900">
         <h2>Redux Toolkit </h2>
         <button onClick={() => dispatch(increment())}>Count {count}</button>
      </main>
   );
}
