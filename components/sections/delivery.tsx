"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Delivery() {
  const [distance, setDistance] = useState<number | null>(null)
  const [address, setAddress] = useState("")

  const calculateDelivery = () => {
    // This is a placeholder calculation
    // In a real app, you would use a geocoding service to calculate the actual distance
    const randomDistance = Math.floor(Math.random() * 50) + 1
    setDistance(randomDistance)
  }

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight sm:text-4xl">
            Izračunajte troškove dostave
          </h2>
          <p className="mb-8 text-muted-foreground">
            Unesite vašu adresu i izračunajte troškove dostave
          </p>
        </div>
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Dostava</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Unesite vašu adresu"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <Button
                  onClick={calculateDelivery}
                  className="w-full"
                  disabled={!address}
                >
                  Izračunaj
                </Button>
                {distance !== null && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Udaljenost od Banja Luke do vaše adrese: {distance} km
                    </p>
                    <p className="mt-2 text-lg font-medium">
                      Troškovi dostave: {distance * 2} KM
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 