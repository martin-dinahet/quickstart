"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export const signOut = async () => {
  await deleteSession();
  redirect("/auth/login");
};
