import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import "@/tailwind.css";

export const metadata: Metadata = {
  title: "Quickstart",
  description: "By Martin :>",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
