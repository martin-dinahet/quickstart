"use client";

import { redirect } from "next/navigation";
import { createContext, type FC, type PropsWithChildren, useContext } from "react";
import type { CurrentUser, CurrentUserContextType } from "@/lib/definitions/current-user";
import { deleteSession } from "@/lib/session";

const CurrentUserContext = createContext<CurrentUserContextType>({
  user: null,
  logout: async () => {},
});

export const CurrentUserProvider: FC<PropsWithChildren & { user: CurrentUser }> = ({
  user,
  children,
}) => {
  const logout = async () => {
    await deleteSession();
    redirect("/");
  };
  return (
    <CurrentUserContext.Provider value={{ user, logout }}>{children}</CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
