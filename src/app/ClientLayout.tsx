"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
      </CartProvider>
    </SessionProvider>
  );
}
