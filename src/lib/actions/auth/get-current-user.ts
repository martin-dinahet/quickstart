"use server";

import { cookies } from "next/headers";
import type { CurrentUser } from "@/lib/definitions/current-user";
import { decryptJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) return null;
  const payload = await decryptJWT(sessionToken);
  if (new Date(payload.expiresAt) < new Date()) return null;
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, username: true },
  });
  return user;
};
