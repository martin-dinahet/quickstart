"use server";

import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import "@/tailwind.css";
import { getCurrentUser } from "@/lib/actions/auth/get-current-user";
import { CurrentUserProvider } from "@/providers/user-provider";

export const metadata: Metadata = {
  title: "Quickstart",
  description: "By Martin :>",
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className="antialiased">
        <CurrentUserProvider user={currentUser}>
          <main>{children}</main>
        </CurrentUserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
