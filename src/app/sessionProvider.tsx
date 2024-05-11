"use client";
import { SessionProvider as Provider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";

type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return (
    <ReduxProvider store={store}>
      <Provider>{children}</Provider>
    </ReduxProvider>
  );
}
