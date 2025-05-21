import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { CartProvider } from "@/lib/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { CategoryProvider } from "@/lib/contexts/category-context"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Nordic Haven | Timeless Furniture, Modern Comfort",
  description: "Discover beautifully crafted, sustainable furniture for modern living at Nordic Haven.",
  generator: 'v0.dev',
  keywords: ['furniture', 'modern furniture', 'sustainable furniture', 'home decor', 'interior design'],
  authors: [{ name: 'Nordic Haven' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nordichaven.com',
    title: 'Nordic Haven | Timeless Furniture, Modern Comfort',
    description: 'Discover beautifully crafted, sustainable furniture for modern living at Nordic Haven.',
    siteName: 'Nordic Haven',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nordic Haven | Timeless Furniture, Modern Comfort',
    description: 'Discover beautifully crafted, sustainable furniture for modern living at Nordic Haven.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <CategoryProvider>
          <CartProvider>{children}</CartProvider>
        </CategoryProvider>
        <Toaster />
      </body>
    </html>
  )
}
