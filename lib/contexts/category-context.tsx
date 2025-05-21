"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CategoryContextType {
  activeCategory: string
  setActiveCategory: (category: string) => void
  scrollToCollection: () => void
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("all")

  const scrollToCollection = () => {
    const collectionSection = document.querySelector("#collection-section")
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory, scrollToCollection }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider")
  }
  return context
} 