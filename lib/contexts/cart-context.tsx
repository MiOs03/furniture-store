"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface CartItem {
  id: string | number
  name: string
  price: number
  image: string
  quantity: number
  customizations?: {
    colors?: Array<{ naziv: string; hex: string }>
    materials?: string[]
    dimensions?: Array<{ naziv: string; vrijednost: string }>
  }
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeItem: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart)
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      // Reset cart if there's an error
      setItems([])
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
      // Calculate total
      const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setTotal(newTotal)
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [items])

  const addToCart = (item: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => String(i.id) === String(item.id))
      if (existingItem) {
        return currentItems.map((i) =>
          String(i.id) === String(item.id)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...currentItems, item]
    })
  }

  const removeItem = (id: string | number) => {
    setItems((currentItems) => currentItems.filter((item) => String(item.id) !== String(id)))
  }

  const updateQuantity = (id: string | number, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => (String(item.id) === String(id) ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 