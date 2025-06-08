"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import Cart from "@/components/cart/cart"
import { useCart } from "@/lib/contexts/cart-context"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

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
            VSistem
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
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Otvori korpu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Vaša korpa ({totalItems})</SheetTitle>
                </SheetHeader>
                <Cart onClose={() => setIsCartOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Otvori korpu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Vaša korpa ({totalItems})</SheetTitle>
                </SheetHeader>
                <Cart onClose={() => setIsCartOpen(false)} />
              </SheetContent>
            </Sheet>
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
                VSistem
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
