import "./globals.css";
import PublicChrome from "@/components/PublicChrome";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-black text-white">
        <PublicChrome />
        {children}
      </body>
    </html>
  );
}
