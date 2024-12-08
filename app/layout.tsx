// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import Player from "@/components/Player";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonara",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} overflow-hidden`}>
        <SupabaseProvider>
          <UserProvider>
            <div className="flex flex-col h-screen">
              <ModalProvider />
              <Header />
              <Sidebar>{children}</Sidebar>
              <Player />
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
