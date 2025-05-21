import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutUsPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center space-y-4 md:order-1">
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Our Story</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Founded in 2010, Nordic Haven began with a simple vision: to create furniture that combines timeless
                design with modern comfort.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our journey started in a small workshop in Stockholm, where our founder, Emma Lindström, crafted her
                first chair. Today, we've grown into a team of passionate artisans and designers, but our commitment to
                quality craftsmanship remains unchanged.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline" className="group">
                <Link href="/about">
                  Learn More About Us{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Our workshop and craftspeople"
              width={800}
              height={600}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
