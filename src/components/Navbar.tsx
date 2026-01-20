"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-blue-200">
            💳 E-Shop
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/cart" className="hover:text-blue-200 transition flex items-center gap-1">
              🛒 Cart ({cart.length})
            </Link>

            {session?.user ? (
              <>
                {session.user.role === "admin" && (
                  <Link href="/admin" className="hover:text-blue-200 transition">
                    📊 Admin
                  </Link>
                )}
                {session.user.role === "support" && (
                  <Link href="/support" className="hover:text-blue-200 transition">
                    👨‍💼 Support
                  </Link>
                )}
                {session.user.role === "user" && (
                  <Link href="/orders" className="hover:text-blue-200 transition">
                    📦 Orders
                  </Link>
                )}
                <span className="text-sm">👤 {session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/" className="block hover:text-blue-200">
              Home
            </Link>
            <Link href="/cart" className="block hover:text-blue-200">
              🛒 Cart ({cart.length})
            </Link>
            {session?.user ? (
              <>
                {session.user.role === "admin" && (
                  <Link href="/admin" className="block hover:text-blue-200">
                    📊 Admin
                  </Link>
                )}
                {session.user.role === "support" && (
                  <Link href="/support" className="block hover:text-blue-200">
                    👨‍💼 Support
                  </Link>
                )}
                {session.user.role === "user" && (
                  <Link href="/orders" className="block hover:text-blue-200">
                    📦 Orders
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
