"use server";

import { prisma } from "@/lib/prisma";
import type { FC } from "react";

const Page: FC = async () => {
  const users = await prisma.user.findMany();
  users.forEach((user) => console.log(user));
  return <div>Hello, World!</div>;
};

export default Page;
