"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCategory } from "@/lib/contexts/category-context"

export default function Footer() {
  const router = useRouter()
  const { setActiveCategory } = useCategory()

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ]

  const productCategories = [
    { value: "all", label: "All" },
    { value: "sofa", label: "Sofas" },
    { value: "bed", label: "Beds" },
    { value: "chair", label: "Chairs" },
    { value: "table", label: "Tables" },
    { value: "panel", label: "Panel Furniture" },
  ]

  const companyInfo = [
    { href: "/about#our-story", label: "Our Story" },
    { href: "/about#our-mission", label: "Our Mission" },
    { href: "/projects", label: "Our Projects" },
    { href: "/contact", label: "Get in Touch" },
  ]

  const handleProductClick = (category: string) => {
    setActiveCategory(category)
    router.push(`/products?category=${category}`)
  }

  return (
    <footer className="border-t bg-surface">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 block text-xl font-light tracking-wide hover:text-accent-purple">
              NORDIC HAVEN
            </Link>
            <p className="mb-6 text-sm text-muted-foreground">
              Crafting timeless furniture for modern living since 2010.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-accent">
                Instagram
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-accent">
                Pinterest
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-accent">
                Facebook
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-accent-purple">Products</h3>
            <ul className="space-y-2 text-sm">
              {productCategories.map((link) => (
                <li key={link.value}>
                  <button
                    onClick={() => handleProductClick(link.value)}
                    className="text-muted-foreground transition-colors hover:text-accent-purple"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-accent-purple">Company</h3>
            <ul className="space-y-2 text-sm">
              {companyInfo.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-accent-purple">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-hover pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nordic Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
