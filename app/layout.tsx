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
  title: "Namještaj po vašoj mjeri | Moderni namještaj",
  description: "Kvalitetan namještaj po mjeri za vaš dom. Širok izbor modernog namještaja, kreveti, garniture, stolovi i više.",
  generator: 'v1.0.0',
  keywords: ['namještaj', 'namještaj po mjeri', 'namještaj za kuhinju', 'namještaj za dnevnu sobu', 'namještaj za spavacu sobu', 'namještaj za kancelariju', 'namještaj za kuhinju', 'namještaj za dnevnu sobu', 'namještaj za spavacu sobu', 'namještaj za kancelariju'],
  authors: [{ name: 'VSistem' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://v-sistem.com',
    title: 'VSistem | Namještaj po mjeri',
    description: 'Namještaj po mjeri',
    siteName: 'v-sistem.com',
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
    <html lang="hr" className={inter.variable}>
      <head>
        <link rel="icon" href="/images/favicon/308993669_2281833768645808_4208482592494353954_n.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-screen bg-white">
        <CategoryProvider>
          <CartProvider>{children}</CartProvider>
        </CategoryProvider>
        <Toaster />
      </body>
    </html>
  )
}
