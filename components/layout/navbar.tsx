"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import Cart from "@/components/cart/cart"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/", label: "Početna" },
    { href: "/about", label: "O Nama" },
    { href: "/products", label: "Proizvodi" },
    { href: "/projects", label: "Projekti" },
    { href: "/contact", label: "Kontakt" },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-xl font-light tracking-wide hover:text-accent-purple">
            NORDIC HAVEN
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent-purple ${
                  isActive(item.href)
                    ? "text-accent-purple"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex md:items-center md:gap-4">
            <Cart />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Cart />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Otvori meni</span>
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          {/* Menu */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-light tracking-wide hover:text-accent-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                NORDIC HAVEN
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Zatvori meni</span>
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium transition-colors hover:text-accent-purple ${
                    isActive(item.href)
                      ? "text-accent-purple"
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
