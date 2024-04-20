"use client";

import { store } from "@/configuration/redux/store";
import React from "react";
import { Provider } from "react-redux";

type ProviderProps = {
   children: React.ReactNode;
};
const Providers = ({ children }: ProviderProps) => {
   return <Provider store={store}>{children}</Provider>;
};

export default Providers;
