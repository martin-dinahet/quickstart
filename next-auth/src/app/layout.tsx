import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "@/tailwind.css";

export const metadata: Metadata = {
  title: "Quickstart",
  description: "By Martin :>",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
