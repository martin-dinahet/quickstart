"use server";

import { cookies } from "next/headers";
import { encryptJWT } from "@/lib/jwt";

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 604800000);
  const session = await encryptJWT({ userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};
