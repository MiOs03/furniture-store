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
  title: "VSistem | Namještaj po mjeri",
  description: "Namještaj po mjeri",
  generator: 'v1.0.0',
  keywords: ['namještaj', 'namještaj po mjeri', 'namještaj za kuhinju', 'namještaj za dnevnu sobu', 'namještaj za spavacu sobu', 'namještaj za kancelariju', 'namještaj za kuhinju', 'namještaj za dnevnu sobu', 'namještaj za spavacu sobu', 'namještaj za kancelariju'],
  authors: [{ name: 'VSistem' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vsistem.ba',
    title: 'VSistem | Namještaj po mjeri',
    description: 'Namještaj po mjeri',
    siteName: 'VSistem',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VSistem | Namještaj po mjeri',
    description: 'Namještaj po mjeri',
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
