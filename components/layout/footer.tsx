"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCategory } from "@/lib/contexts/category-context"

export default function Footer() {
  const router = useRouter()
  const { setActiveCategory } = useCategory()

  const mainLinks = [
    { href: "/", label: "Početna" },
    { href: "/about", label: "O nama" },
    { href: "/products", label: "Proizvodi" },
    { href: "/projects", label: "Projekti" },
    { href: "/contact", label: "Kontakt" },
  ]

  const productCategories = [
    { value: "all", label: "Sve" },
    { value: "ugaona-garnitura", label: "Ugaone garniture" },
    { value: "krevet", label: "Kreveti" },
    { value: "stolica", label: "Stolice" },
    { value: "stol", label: "Stolovi" },
    { value: "pločasti-namještaj", label: "Pločasti namještaj" },
    { value: "tdf", label: "TDF" },
  ]

  const companyInfo = [
    { href: "/about#our-story", label: "Naša priča" },
    { href: "/about#our-mission", label: "Naša misija" },
    { href: "/projects", label: "Naši projekti" },
    { href: "/contact", label: "Kontaktirajte nas" },
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
              VSistem
            </Link>
            <p className="mb-6 text-sm text-muted-foreground">
            Proizvodnja tapaciranog namještaja. Veliki izbor modela, materijala i boja. Mogućnost izrade namještaja po mjeri.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/v.sistem_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground transition-colors hover:text-accent">
                Instagram
              </Link>
              <Link href="https://www.tiktok.com/@vsistem" 
              target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground transition-colors hover:text-accent">
                TikTok
              </Link>
              <Link 
                href="https://www.facebook.com/VSistemNamjestaj" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                Facebook
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-accent-purple">Proizvodi</h3>
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
            <h3 className="mb-4 text-lg font-medium text-accent-purple">VSistem</h3>
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
            © {new Date().getFullYear()} VSistem. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  )
}
